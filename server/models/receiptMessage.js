import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

const userWithItemsSchema = new mongoose.Schema({
    userName: String,
    items: [itemSchema],
    bill: {
        type: Number,
        default: 0
    }
});

const receiptSchema = mongoose.Schema({
    event: String,
    users: [ String ],
    uploadedFile: String,
    gptResponse: mongoose.Schema.Types.Mixed,
    gptCopy: mongoose.Schema.Types.Mixed,
    usersWithItems: [userWithItemsSchema],
});

const ReceiptMessage = mongoose.model('ReceiptMessage', receiptSchema);

export default ReceiptMessage;

