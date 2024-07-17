import express from 'express';
import { getReceipts, createReceipt, updateReceipt, deleteReceipt, updateReceiptSplit } from '../controllers/receipts.js';

const router = express.Router();

router.get('/', getReceipts);
router.post('/', createReceipt);
router.patch('/:id', updateReceipt);
router.delete('/:id', deleteReceipt);
router.patch('/:id/split', updateReceiptSplit);

export default router;