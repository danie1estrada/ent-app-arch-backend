const Business = require('../models/business.model');
const User = require('../models/user.model');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).select('+password').exec((err, user) => {
        if (err) return res.status(500).json({
            success: false,
            message: err
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no existe'
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const business = await Business.findOne({ ownerId: user.id });
        const authenticatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            type: user.type
        }

        const accessToken = jwt.sign({
            authenticatedUser
        }, process.env.SECRET);

        return res.json({
            accessToken,
            authenticatedUser,
            business
        });
    });
});

router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type || 'customer',
        password: bcrypt.hashSync(req.body.password, 10)
    });

    try {
        const authenticatedUser = await user.save();
        delete authenticatedUser.password;

        const accessToken = jwt.sign({
            authenticatedUser
        }, process.env.SECRET);

        res.json({
            accessToken,
            authenticatedUser
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Correo o teléfono ya están registrados'
        });
    }
});

module.exports = router;