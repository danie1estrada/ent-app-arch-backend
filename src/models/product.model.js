const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    businessId: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, default: '' },
    stock: { type: Number }
});

module.exports = mongoose.model('Product', ProductSchema);