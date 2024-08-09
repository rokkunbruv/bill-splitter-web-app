// /server/controllers/members.js
import Member from '../models/member.js';

export const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMember = async (req, res) => {
    const { name } = req.body;
    const newMember = new Member({ name });
    try {
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};