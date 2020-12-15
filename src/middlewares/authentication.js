const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    jwt.verify(req.get('Authorization'), 'gomita', (err, decoded) => {
        if (err) return res.status(403).json({
            success: false,
            message: 'Forbiden'
        });
        req.authenticatedUser = decoded.authenticatedUser;
        next();
    })
}

module.exports = validateToken;