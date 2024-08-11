import mongoose from 'mongoose';

const receiptSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
    },
    event: String,
    users: [String],
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