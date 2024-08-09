// /server/routes/members.js
import express from 'express';
import { getMembers, createMember } from '../controllers/members.js';

const router = express.Router();

router.get('/', getMembers);
router.post('/', createMember);

export default router;