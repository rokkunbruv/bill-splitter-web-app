import express from 'express';
import { getReceipts, createReceipt, updateReceipt, deleteReceipt, updateReceiptSplit } from '../controllers/receipts.js';
import { protect } from '../middleware/userProtected.js';

const router = express.Router();

router.use(protect);

router.get('/', getReceipts);
router.post('/', createReceipt);
router.patch('/:id', updateReceipt);
router.delete('/:id', deleteReceipt);
router.patch('/:id/split', updateReceiptSplit);

export default router;