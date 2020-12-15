const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    type: { type: String, enum: ['customer', 'business'], default: 'customer' }
});

module.exports = mongoose.model('User', UserSchema);