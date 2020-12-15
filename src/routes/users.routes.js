const User = require('../models/user.model');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await User.find());
    } catch(error) {
        res.status(500).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await User.findById(req.params.id));
    } catch (ex) {
        res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
});

router.post('/',  async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    try {
        res.json(await user.save());
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.put('/', async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.body.id },
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        );
        res.json({
            success: true,
            message: 'Usuario actualizado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

router.delete('/', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.body.id });
        res.json({ 
            success: true,
            message: 'Usuario eliminado'
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;