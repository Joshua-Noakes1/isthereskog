const lcl = require('cli-color'),
    express = require('express'),
    getStores = require('./getStores');

// global express router
const router = express.Router();

router.get('/', function (req, res) {
    res.end('lol');
});

// Api routes
router.get('/getStores', async function (req, res) {
    // log error if no country code is passed
    if (req.query.ISOCode == undefined) {
        console.log(lcl.red("[Express - Error]"), "No ISO code provided");
        return res.status(400).json({success: false, error: "No ISO code provided"});
    }

    // get stores
    res.json(await getStores(req.query.ISOCode));
});


module.exports = router;