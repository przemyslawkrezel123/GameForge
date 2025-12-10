const router = require('express').Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getAllGames);
router.post('/', gameController.createGame);

module.exports = router;