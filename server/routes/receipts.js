import express from 'express';
import { getReceipts, createReceipt, updateReceipt, deleteReceipt } from '../controllers/receipts.js';

const router = express.Router();

router.get('/', getReceipts);
router.post('/', createReceipt);
router.patch('/:id', updateReceipt);
router.delete('/:id', deleteReceipt);

export default router;
