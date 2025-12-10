const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLibraryByUser = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);

        const userGames = await prisma.library.findMany({
            where: { user_id },
            select: {
                game: {
                    select: {
                        game_id: true,
                        name: true,
                        genre: true,
                        description: true,
                        rate: true
                    }
                },
                favourites: true,
            }
        })

        return res.status(200).json(userGames);
    } catch (err) {
        return res.status(500).json({ error: `Failed to fetch library: ${err.message}` });
    }
}