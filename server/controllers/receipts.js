import mongoose from 'mongoose';
import ReceiptMessage from '../models/receiptMessage.js';
import getReceiptInfo from '../services/openai.js';

export const getReceipts =  async (req, res) => {
    try {
        const receiptMessages = await ReceiptMessage.find();

        console.log(receiptMessages);

        res.status(200).json(receiptMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//add
export const createReceipt = async (req, res) => {
    const receipt = req.body;

    const gptResponse = await getReceiptInfo(receipt.uploadedFile) //chatgpt
    

    const usersWithItems = receipt.users.map((userName, index) => {
        console.log(`Processing user ${index}: ${userName}`);
        const items = []; 
        const bill = 0;
        return { userName, items, bill };
    });

    console.log("user:", usersWithItems);

    const newReceipt = new ReceiptMessage({ ...receipt, gptResponse, gptCopy: gptResponse, usersWithItems });

    try {
        await newReceipt.save();

        res.status(201).json(newReceipt);
    } catch (error) {
        res.status(409).json( { message: error.message });
    }
};

export const updateReceipt = async (req, res) => {
    const { id: _id } = req.params;
    const receipt = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No receipt with that id');

    const updatedReceipt = await ReceiptMessage.findByIdAndUpdate(_id, { ...receipt, _id }, { new: true });

    res.json(updatedReceipt);
}

export const deleteReceipt = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await ReceiptMessage.findByIdAndDelete(id);

    res.json({ message: 'Receipt deleted successfully' });
}

export const assignItemToUser = async (req, res) => {
    const { id } = req.params;
    const { user, item } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No receipt with that id');

    const receipt = await ReceiptMessage.findById(id);
    
    const userIndex = receipt.usersWithItems.findIndex(u => u.userName === user);
    if (userIndex !== -1) {
        receipt.usersWithItems[userIndex].items.push(item);
        receipt.usersWithItems[userIndex].bill += item.price * item.quantity;
    }

    const updatedReceipt = await ReceiptMessage.findByIdAndUpdate(id, receipt, { new: true });

    res.json(updatedReceipt);
}
