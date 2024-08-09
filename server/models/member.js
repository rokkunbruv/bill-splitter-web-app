// /server/models/member.js
import mongoose from 'mongoose';

const memberSchema = mongoose.Schema({
    name: String,
});

const Member = mongoose.model('Member', memberSchema);

export default Member;