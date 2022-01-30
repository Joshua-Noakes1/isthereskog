const express = require('express');
// global express router
const router = express.Router();

// Api routes
router.get('/', function (req, res) {
    res.redirect(307, '/api/v1/');
});

router.get('/v1', async function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/isthereskog');
});

// v1 
router.get('/v1/skog/getStock', async function (req, res) {
    res.send("lol")
});

// ingka routes
router.use('/v1/ingka', require('./v1/skog/ingka/router'));

module.exports = router;