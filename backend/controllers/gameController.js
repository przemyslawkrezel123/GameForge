const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllGames = async (req, res) => {
    try {
        const { user_id } = req.query;

        const games = await prisma.game.findMany({
            select: {
                game_id: true,
                name: true,
                genre: true,
                price: true,
                description: true,
                shop_id: true,
                libraries: user_id ? {
                    where: { user_id: Number(user_id) },
                    select: { user_id: true }
                } : false
            }
        });

        const enriched = games.map(g => ({
            game_id: g.game_id,
            name: g.name,
            genre: g.genre,
            price: g.price,
            description: g.description,
            shop_id: g.shop_id,
            availability: g.libraries && g.libraries.length > 0 ? 'BOUGHT' : 'AVAILABLE'
        }));
        return res.status(200).json(user_id ? enriched : games);
    } catch (err) {
        return res.status(500).json({ error: `Failed to fetch games: ${err.message}` });
    }
}

exports.createGame = async (req, res) => {
    try {
        const { name, genre, price, description, shop_id } = req.body
        const priceNum = Number(price);
        const shopId = Number(shop_id);

        if (!name || !genre || !description || shop_id === undefined) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (!Number.isFinite(priceNum) || priceNum <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number.' });
        }

        if (!Number.isInteger(shopId) || shopId <= 0) {
            return res.status(400).json({ error: 'shop_id must be a positive integer.' });
        }

        const newGame = await prisma.game.create({
            data: {
                name,
                genre,
                price: priceNum,
                description,
                shop_id: shopId
            },
            select: {
                game_id: true,
                name: true,
                genre: true,
                price: true,
                description: true,
                shop_id: true
            }
        })

        return res.status(201).json(newGame);
    } catch (err) {
        return res.status(500).json({ error: `Failed to create game: ${err.message}` });
    }
}