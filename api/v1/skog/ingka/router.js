const lcl = require('cli-color'),
    express = require('express'),
    afe = require('../../../../lib/asyncForEach'),
    getStores = require('./getStores'),
    getStock = require('./getStock');

// global express router
const router = express.Router();

router.get('/', function (req, res) {
    res.end('lol');
});

// Api routes
router.get('/getStores', async function (req, res) {
    // log error if no country code is passed
    if (!req.query.ISOCode) {
        console.log(lcl.red("[Express - Error]"), "No ISO code provided");
        return res.status(400).json({
            success: false,
            error: "No ISO code provided"
        });
    }

    // ISO code to uppercase
    const ISOCode = req.query.ISOCode.toUpperCase();

    // get stores
    res.json(await getStores(ISOCode));
});

router.get('/getStock', async function (req, res) {
    // log error if no bucode is passed
    if (!req.query.buCode) {
        console.log(lcl.red("[Express - Error]"), "No store code provided");
        return res.status(400).json({
            success: false,
            error: "No store code provided"
        });
    }

    // log error if no country code is passed
    if (!req.query.ISOCode) {
        console.log(lcl.red("[Express - Error]"), "No ISO code provided");
        return res.status(400).json({
            success: false,
            error: "No ISO code provided"
        });
    }

    // ISO code to uppercase
    const ISOCode = req.query.ISOCode.toUpperCase();

    // loop over stores to check store exists and get its name
    const stores = await getStores(ISOCode);
    const stockStore = {
        found: false,
        name: '',
        buCode: req.query.buCode
    };
    await afe(stores.stores, async (store, index) => {
        if (store.buCode === req.query.buCode) {
            // store found
            console.log(lcl.green("[Store Lookup - Success]"), "Found store:", lcl.yellow(`${store.name} (${store.buCode})`));
            stockStore.found = true;
            stockStore.name = store.name;
        }
    });

    // if store not found return error
    if (!stockStore.found) {
        console.log(lcl.red("[Store Lookup - Error]"), "Failed to find store:", lcl.yellow(`${stockStore.name} (${stockStore.buCode})`));
        return res.status(400).json({
            success: false,
            error: "Failed to find store"
        });
    }

    // get stock
    res.json(await getStock(stockStore.buCode, stockStore.name));
});


module.exports = router;