const express = require('express'),
    lcl = require('cli-color'),
    afe = require('../../../lib/asyncForEach'),
    getStores = require('../ingka/getStores'),
    getStock = require('../ingka/getStock');

// global express router
const router = express.Router();

router.get('/', function (req, res) {
    return res.redirect(307, 'https://github.com/joshua-noakes1/isthereskog');
});

// v1 
router.get('/getStock', async function (req, res) { // /api/v1/skog/getStock?buCode=000&ISOCode=GB
    // catch if no bucode is passed
    if (req.query.buCode == null) {
        console.log(lcl.red("[Store Lookup - Error]"), "No store code provided");
        return res.status(400).json({
            success: false,
            message: "No store code provided"
        });
    }

    // check if no ISO is passed
    if (req.query.ISOCode == null) {
        console.log(lcl.red("[Store Lookup - Error]"), "No ISO code provided");
        return res.status(400).json({
            success: false,
            message: "No ISO code provided"
        });
    }

    // ISO code to uppercase
    const ISOCode = req.query.ISOCode.toUpperCase();

    // get store data
    const storeData = {
        success: false,
        store: {}
    };

    try {
        // lookup if store exists
        const countryData = await getStores(ISOCode);
        await afe(countryData.stores, async (store) => {
            if (store.buCode == req.query.buCode) {
                console.log(lcl.green("[Store Lookup - Success]"), "Found store:", lcl.yellow(`${store.name} (${store.buCode})`));
                storeData.success = true;
                storeData.store = store;
            }
        });

        // cant find store
        if (!storeData.success) {
            console.log(lcl.red("[Store Lookup - Error]"), "Failed to get store data for store:", lcl.yellow(`${req.query.buCode}`));
            return res.status(500).json({
                success: false,
                message: 'Failed to find store in country: \"' + ISOCode + "\""
            });
        }
    } catch (error) {
        // catch error
        console.log(lcl.red("[Store Lookup - Error]"), "Failed to get data for store:", lcl.yellow(`${req.query.buCode}`));
        return res.status(500).json({
            success: false,
            message: "Failed to find store data, It may not exist in country: \"" + ISOCode + "\""
        });
    }

    // try and get stock info for selected buCode
    try {
        const stockData = await getStock(storeData.store.buCode, storeData.store.name, '00402813'); // 00402813 = SKOG
        return res.json(stockData);
    } catch (error) {
        // catch error
        console.log(lcl.red("[Store Lookup - Error]"), "Failed to get stock data for store:", lcl.yellow(`${req.query.buCode}`));
        return res.status(500).json({
            success: false,
            message: "Failed to find stock data for store: \"" + req.query.buCode + "\""
        });
    }
});

module.exports = router;