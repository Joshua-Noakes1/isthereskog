const express = require('express'),
    getStore = require('./skog/ingka/getStores'),
    getStock = require('./skog/ingka/getStock');

// global express router
const router = express.Router();

router.get('/', function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/isthereskog');
});


// v1 
router.get('/skog/getStock', async function (req, res) {
    // catch if no bucode is passed
    if (req.query.buCode == null) {
        console.log(lcl.red("[Store Lookup - Error]"), "No store code provided");
        return res.status(400).json({
            success: false
        });
    }

    // check if no ISO is passed
    if (req.query.iso == null) {
        console.log(lcl.red("[Store Lookup - Error]"), "No ISO code provided");
        return res.status(400).json({
            success: false
        });
    }

    const stockData = {
        store: {
            buCode: req.query.buCode,
            name: ''
        },
        ISO: req.query.ISOCode,
    }

    // get store data
    try {
        const store = await getStore(req.query.buCode);
        stockData.store.name = store.name;
    } catch (e) {
        console.log(lcl.red("[Store Lookup - Error]"), "Failed to get store data for store:", lcl.yellow(`${req.query.buCode}`));
        return res.status(500).json({
            success: false
        });
    }

    res.send('lol');
});

// ingka routes
router.use('/ingka', require('./skog/ingka/router'));

module.exports = router;