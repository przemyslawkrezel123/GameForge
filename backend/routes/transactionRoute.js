const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getTransactionsByUser);
router.post('/', transactionController.createTransaction);
router.post('/complete', transactionController.completeTransaction);

module.exports = router;