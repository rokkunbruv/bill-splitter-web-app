import Member from '../models/member.js';

export const getMembers = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming `req.user` is set by your middleware
        const members = await Member.find({ userId });
        res.status(200).json(members);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createMember = async (req, res) => {
    const { name } = req.body;
    const userId = req.user._id; // Assuming `req.user` is set by your middleware

    const newMember = new Member({ name, userId });

    try {
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        // Find the member by id and userId to ensure the user owns this member
        const member = await Member.findOneAndDelete({ _id: id, userId });

        if (!member) {
            return res.status(404).json({ message: "Member not found or you don't have permission to delete this member" });
        }

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting member", error: error.message });
    }
};
