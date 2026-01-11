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
                        price: true,
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

exports.toggleGameFavourite = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const game_id = parseInt(req.params.game_id);

        if (isNaN(user_id) || isNaN(game_id)) {
            return res.status(400).json({ error: 'Invalid user_id or game_id' });
        }

        const libraryEntry = await prisma.library.findUnique({
            where: {
                user_id_game_id: {
                    user_id,
                    game_id
                }
            }
        });

        if (!libraryEntry) {
            return res.status(404).json({ error: 'Game not found in user library' });
        }

        const updatedEntry = await prisma.library.update({
            where: {
                user_id_game_id: {
                    user_id,
                    game_id
                }
            },
            data: {
                favourites: !libraryEntry.favourites
            }
        });

        return res.status(200).json(updatedEntry);
    } catch (err) {
        return res.status(500).json({ error: `Failed to toggle game favourite status: ${err.message}` });
    }
}