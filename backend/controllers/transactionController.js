const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTransactionsByUser = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const userTransactions = await prisma.transaction.findMany({
            where: { user_id: parseInt(user_id) },
            select: {
                transaction_id: true,
                amount: true,
                status: true,
                created_at: true,
                completed_at: true,
                game: {
                    select: {
                        game_id: true,
                        name: true
                    }
                }
            }
        });

        return res.status(200).json(userTransactions);
    } catch (err) {
        return res.status(500).json({ error: `Failed to fetch transactions: ${err.message}` });
    }
}

exports.createTransaction = async (req, res) => {
    try {
        const { user_id, game_id } = req.body;
        const userId = Number(user_id);
        const gameId = Number(game_id);
        
        if (!Number.isInteger(userId) || !Number.isInteger(gameId)) {
            return res.status(400).json({ error: 'User ID and Game ID are required.' });
        }
        
        const owned = await prisma.transaction.findFirst({
            where: { user_id: userId, game_id: gameId }
        });
        if (owned) {
            return res.status(409).json({ error: 'Game already belongs to user.' });
        }
        
        const game = await prisma.game.findUnique({
            where: { game_id: gameId },
            select: { price: true }
        });
        if (!game) {
            return res.status(404).json({ error: 'Game not found.' });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                amount: game.price,
                status: 'WAITING',
                user_id: userId,
                game_id: gameId
            },
            select: {
                transaction_id: true,
                amount: true,
                status: true,
                created_at: true,
                user: {
                    select: {
                        user_id: true,
                        username: true,
                    }
                },
                game: {
                    select: {
                        game_id: true,
                        name: true,
                    }
                }
            }
        })

        return res.status(201).json(newTransaction);

    } catch (err) {
        return res.status(500).json({ error: `Failed to create transaction: ${err.message}` });
    }
};

exports.completeTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.body;
        const trId = Number(transaction_id);

        if (!Number.isInteger(trId) || trId <= 0) {
            return res.status(400).json({ error: 'Valid transaction_id is required.' });
        }

        const transaction = await prisma.transaction.findUnique({
            where: { transaction_id: trId },
            select: { transaction_id: true, status: true, user_id: true, game_id: true }
        });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found.' });
        }

        if (transaction.status === 'COMPLETED') {
            return res.status(409).json({ error: 'Transaction already completed.' });
        }

        const result = await prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.update({
                    where: { transaction_id: trId },
                    data: { 
                        status: 'COMPLETED', 
                        completed_at: new Date() 
                    },
                    select: { transaction_id: true, status: true, completed_at: true, user_id: true, game_id: true }
                });

            const libraryEntry = await tx.library.create({
                    data: { user_id: transaction.user_id, game_id: transaction.game_id, favourites: false },
                    select: { user_id: true, game_id: true }
                });

            return { transaction, libraryEntry };
        });

        return res.status(200).json(result.transaction);

    } catch (err) {
        return res.status(500).json({ error: `Failed to complete transaction: ${err.message}` });
    }
}