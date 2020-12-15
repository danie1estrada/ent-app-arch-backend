const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    lineOfBusiness: { type: String, required: true },
    address: { type: String, required: true },
    schedule: { type: String, required: true },
    ownerId: { type: String, required: true }
});

module.exports = mongoose.model('Business', BusinessSchema);