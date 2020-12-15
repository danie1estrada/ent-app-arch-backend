//sconst Business = require('../models/business.model');
const Product = require('../models/product.model');
const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        res.json(await Product.find({ name: { $regex: `.*${req.params.query}.*` } }));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;