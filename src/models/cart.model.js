const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    businessId: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', CartSchema);