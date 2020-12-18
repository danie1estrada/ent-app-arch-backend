//sconst Business = require('../models/business.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await Product.find());
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

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

router.get('/shopping-cart/:customerId', async (req, res) => {
    try {
        res.json(await Cart.find({ customerId: req.params.customerId }));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.post('/shopping-cart', async (req, res) => {
    const cart = new Cart({
        customerId: req.body.customerId,
        businessId: req.body.businessId,
        productId: req.body.productId,
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
    });

    try {
        res.json(await cart.save());
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.delete('/shopping-cart', async (req, res) => {
    await Cart.deleteOne({ _id: req.body.id });

    try {
        res.json({ 
            success: true,
            message: 'Producto eliminado del carrito'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;