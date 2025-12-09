const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await prisma.review.findMany();
        return res.status(200).json(reviews);
    } catch (err) {
        return res.status(500).json({ error: `Failed to fetch reviews: ${err.message}` });
    }
}