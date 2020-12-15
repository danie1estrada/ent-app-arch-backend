const express = require('express');
const router = express.Router();

router.use('/business', require('./business.routes'));
router.use('/users', require('./users.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;