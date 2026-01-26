const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.get('/:user_id', transactionController.getTransactionsByUser);
router.post('/', transactionController.createTransaction);
router.put('/:transaction_id/complete', transactionController.completeTransaction);
router.delete('/:transaction_id/cancel', transactionController.cancelTransaction);

module.exports = router;