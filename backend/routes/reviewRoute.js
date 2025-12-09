const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);

module.exports = router;