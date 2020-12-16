const mongoose = require('mongoose');
const Product = require('./product.model');

const OrderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    businessId: { type: String, required: true },
    product: { type: Product,  }
});

module.exports = mongoose.model('Order', OrderSchema);