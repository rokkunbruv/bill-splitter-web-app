import mongoose from 'mongoose';

const receiptSchema = mongoose.Schema({
    event: String,
    users: [ String ],
    uploadedFile: String,
    gptResponse: mongoose.Schema.Types.Mixed,
});

const ReceiptMessage = mongoose.model('ReceiptMessage', receiptSchema);

export default ReceiptMessage;