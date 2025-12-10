const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllReviewsByGame = async (req, res) => {
    try {
        const { game_id } = req.params;

        const gameReviews = await prisma.review.findMany({
            where: { game_id: parseInt(game_id) },
            select: {
                review_id: true,
                rating: true,
                review_text: true,
                created_at: true,
                game_id: true,
                user: {
                    select: {
                        user_id: true,
                        username: true,
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        })

        return res.status(200).json(gameReviews);
    } catch (err) {
        return res.status(500).json({ error: `Failed to fetch reviews: ${err.message}` });
    }
}

exports.createReview = async (req, res) => {
    try {
        const { rating, review_text, user_id, game_id } = req.body;
        
        if (!rating) {
            return res.status(400).json({ error: 'Rating is required.' });
        }
        if (rating < 0 || rating > 10) {
            return res.status(400).json({ error: 'Rating must be between 0 and 10.' });
        }

        if (!review_text || review_text.trim() === '') {
            return res.status(400).json({ error: 'Review text cannot be empty.' });
        }

        if (!user_id || !game_id) {
            return res.status(400).json({ error: 'User ID and Game ID are required.' });
        }

        const existing = await prisma.review.findFirst({
            where: { user_id, game_id }
        });
        if (existing) {
            return res.status(409).json({ error: 'User already reviewed this game.' });
        }
            
        const result = await prisma.$transaction(async (tx) => {
            const created = await tx.review.create({
                data: { rating, review_text, user_id, game_id },
                select: {
                    review_id: true,
                    rating: true,
                    review_text: true,
                    created_at: true,
                    game_id: true,
                    user: {
                        select: {
                            user_id: true,
                            username: true,
                        }
                    }
                }
            });

            const agg = await tx.review.aggregate({
                where: { game_id },
                _avg: { rating: true }
            });
            // agg:
            // {
            //     _avg: {
            //         rating: number | null
            //     }
            // }
            const avg = agg._avg.rating ?? 0;

            await tx.game.update({
                where: { game_id },
                data: { rate: avg }
            });

            return created;
        });

        return res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({ error: `Failed to create review: ${err.message}` });
    }
}