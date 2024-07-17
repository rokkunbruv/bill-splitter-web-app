import express from 'express';
import { getReceipts, createReceipt, updateReceipt, deleteReceipt, assignItemToUser} from '../controllers/receipts.js';

const router = express.Router();

router.get('/', getReceipts);
router.post('/', createReceipt);
router.patch('/:id', updateReceipt);
router.delete('/:id', deleteReceipt);
router.patch('/:id/assign', assignItemToUser)


export default router;
