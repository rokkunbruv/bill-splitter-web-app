import mongoose from 'mongoose';

const receiptSchema = mongoose.Schema({
    event: String,
    users: [String], // Make sure this line is included
    uploadedFile: String,
    gptResponse: mongoose.Schema.Types.Mixed,
    gptCopy: mongoose.Schema.Types.Mixed,
    usersWithItems: [{
        userName: String,
        items: [{
            name: String,
            price: Number,
            quantity: Number
        }],
        bill: Number
    }],
});

const ReceiptMessage = mongoose.model('ReceiptMessage', receiptSchema);

export default ReceiptMessage;