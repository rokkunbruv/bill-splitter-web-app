import express from 'express';
import { getMembers, createMember, deleteMember } from '../controllers/members.js';
import { protect } from '../middleware/userProtected.js'; 

const router = express.Router();

router.get('/', protect, getMembers);
router.post('/', protect, createMember);
router.delete('/:id', protect, deleteMember);

export default router;
