const express = require('express');

// global express router
const router = express.Router();

router.get('/', function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/isthereskog'); // /api/v1
});

// v1 routes
router.use('/ingka', require('./ingka/router')); // /api/v1/ingka
router.use('/skog', require('./skog/router')); // /api/v1/skog

module.exports = router;