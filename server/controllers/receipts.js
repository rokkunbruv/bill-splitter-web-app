import mongoose from 'mongoose';
import ReceiptMessage from '../models/receiptMessage.js';
import getReceiptInfo from '../services/openai.js';
import Member from '../models/member.js'; // Import the Member model

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

    const gptResponse =  {
        "items": [
            {
                "name": "T-Shirt Blue",
                "price": 21.9,
                "quantity": 2
            },
            {
                "name": "T-Shirt Green ",
                "price": 12.99,
                "quantity": 4
            },
            {
                "name": "Pants",
                "price": 35.99,
                "quantity": 4
            },
            {
                "name": "Socks",
                "price": 4,
                "quantity": 2
            }
        ],
        "total_num_items": 4,
        "total_cost": 247.72,
        "payment": 300,
        "change": 52.28
    }

    try {
         //Fetch all members
        const members = await Member.find().exec();

        // Check if receipt.users exists, if not, initialize it as an empty array
        const users = receipt.users || [];

        // Map members to usersWithItems
        const usersWithItems = users.map((user) => ({
            userName: user,
            items: [],
            bill: 0
        }));

        // Create a new ReceiptMessage document
        const newReceipt = new ReceiptMessage({
            event: receipt.event,
            uploadedFile: receipt.uploadedFile,
            gptResponse: gptResponse,
            gptCopy: gptResponse,
            usersWithItems: usersWithItems,
            users: users, // Store the list of users from the receipt
            members: members // Store the list of members
        });

        // Save the newReceipt to the database
        await newReceipt.save();

        // Respond with the created newReceipt
        res.status(201).json(newReceipt);
    } catch (error) {
        // Handle errors if any
        res.status(409).json({ message: error.message });
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
        // Find if the item already exists for the user
        const existingItemIndex = receipt.usersWithItems[userIndex].items.findIndex(i => i.name === item.name);

        if (existingItemIndex !== -1) {
            // If item exists, update the quantity and bill
            receipt.usersWithItems[userIndex].items[existingItemIndex].quantity += item.quantity;
        } else {
            // If item does not exist, add it to the user's items
            receipt.usersWithItems[userIndex].items.push(item);
        }
        receipt.usersWithItems[userIndex].bill += item.price * item.quantity;

        // Update gptCopy
        const gptCopyItemIndex = receipt.gptCopy.items.findIndex(gptItem => gptItem.name === item.name);
        if (gptCopyItemIndex !== -1) {
            receipt.gptCopy.items[gptCopyItemIndex].quantity -= item.quantity;
            if (receipt.gptCopy.items[gptCopyItemIndex].quantity <= 0) {
                receipt.gptCopy.items.splice(gptCopyItemIndex, 1);
            }
        }
    }

    const updatedReceipt = await ReceiptMessage.findByIdAndUpdate(id, receipt, { new: true });

    res.json(updatedReceipt);
};

export const updateReceiptSplit = async (req, res) => {
    const { id } = req.params;
    const usersSplit = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No receipt with that id');

    const updatedReceipt = await ReceiptMessage.findById(id);

    if (!updatedReceipt) return res.status(404).send('Receipt not found');

    updatedReceipt.usersWithItems = Object.entries(usersSplit).map(([userName, data]) => ({
        userName,
        items: data.items,
        bill: data.total
    }));

    await updatedReceipt.save();

    res.json(updatedReceipt);
};