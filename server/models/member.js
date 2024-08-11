import mongoose from 'mongoose';

const memberSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true,
    },
    name: String,
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
