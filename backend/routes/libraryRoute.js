const router = require('express').Router();
const libraryController = require('../controllers/libraryController');

router.get('/:user_id', libraryController.getLibraryByUser);

module.exports = router;