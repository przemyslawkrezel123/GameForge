const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router.get('/:game_id', reviewController.getAllReviewsByGame);
router.post('/', reviewController.createReview);

module.exports = router;