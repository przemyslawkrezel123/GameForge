const router = require('express').Router();
const libraryController = require('../controllers/libraryController');

router.get('/:user_id', libraryController.getLibraryByUser);
router.put('/:user_id/games/:game_id/favourite', libraryController.toggleGameFavourite);

module.exports = router;