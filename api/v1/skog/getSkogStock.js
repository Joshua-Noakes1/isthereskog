const lcl = require('cli-color'),
    getStock = require('../ingka/getStock');

async function getSkogStock(buCode, storeName) {
    // getting stock from ingka
    try {
       console.log(lcl.blue("[Skog Stock - Info]"), "Getting stock data for skog in store:", lcl.yellow(`${buCode}`));
       return await getStock(buCode, storeName, '00402813');
    } catch (error) {
        console.log(lcl.red("[Skog Stock - Error]"), "Failed to check for skog stock", error);
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