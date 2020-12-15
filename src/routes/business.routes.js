const Business = require('../models/business.model');
const Product = require('../models/product.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await Business.find());
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await Business.findById(req.params.id));
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.post('/',  async (req, res) => {
    const business = new Business({
        name: req.body.name,
        description: req.body.description,
        lineOfBusiness: req.body.lineOfBusiness,
        address: req.body.address,
        schedule: req.body.schedule
    });

    try {
        res.json(await business.save());
    } catch(error) {
        res.status(500).json({ error });
    }
});

router.get('/:id/products', async (req, res) => {
    try {
        res.json(await Product.find({ businessId: req.params.id }));
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.post('/:id/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        businessId: req.params.id,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock
    });

    try {
        res.json(await product.save());
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.put('/:id/products', async (req, res) => {
    try {
        await Product.updateOne(
            { _id: req.body.id },
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock
            }
        );
        res.json({
            success: true,
            message: 'Producto actualizado'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.delete('/:id/products', async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.body.id });
        res.json({
            success: true,
            message: 'Producto eliminado'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;