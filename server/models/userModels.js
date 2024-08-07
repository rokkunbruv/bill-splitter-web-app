
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    resetCode: {
        type: String,
        default: null,
    },
    resetCodeExpiresAt: {
        type: Date,
        default: null,
    }
});

const User = mongoose.model("User", userSchema);

export default User;