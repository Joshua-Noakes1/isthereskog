const lcl = require('cli-color'),
    ingka = require('ikea-availability-checker');

async function getStock(buCode, storeName, prodCode) {
    // catch if no bucode is passed
    if (buCode == null) {
        console.log(lcl.red("[Store Lookup - Error]"), "No store code provided");
        return {
            success: false
        }
    }

    // log lookup
    console.log(lcl.blue("[Stock Lookup - Info]"), "Looking up stock data for product in store:", lcl.yellow(`${storeName} (${buCode})`));

    // lookup stock for skog in store
    try {
        const stock = await ingka.availability(buCode, prodCode)
        console.log(lcl.green("[Stock Lookup - Success]"), "Found stock data for product in store:", lcl.yellow(`${storeName} (${buCode})`));
        return {
            success: true,
            stock
        }
    } catch (e) {
        console.log(lcl.red("[Stock Lookup - Error]"), "Failed to get stock data for product in store:", lcl.yellow(`${storeName} (${buCode})`));
        return {
            success: false,
            stock: {
                buCode: 0,
                productId: 0,
                createdAt: new Date().toISOString(),
                forecast: [{
                    "stock": 0,
                    "date": new Date(Date.now() + 86500000).toISOString(), // 86500000 is 1 day in milliseconds
                    "probability": "LOW"
                }, {
                    "stock": 0,
                    "date": new Date(Date.now() + 172800000).toISOString(),
                    "probability": "LOW"
                }, {
                    "stock": 0,
                    "date": new Date(Date.now() + 259200000).toISOString(),
                    "probability": "LOW"
                }, {
                    "stock": 0,
                    "date": new Date(Date.now() + 345600000).toISOString(),
                    "probability": "LOW"
                }, ],
                probability: "LOW",
                restockDate: null,
                stock: 0
            }
        }
    }

}

module.exports = getStock;