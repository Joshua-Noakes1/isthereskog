const lcl = require('cli-color'),
    ingka = require('ikea-availability-checker');

async function getStock(buCode, storeName) {
    // catch if no bucode is passed
    if (buCode == null) {
        console.log(lcl.red("[Store Lookup - Error]"), "No store code provided");
        return {
            success: false
        }
    }

    // log lookup
    console.log(lcl.blue("[Stock Lookup - Info]"), "Looking up stock data for skog in store:", lcl.yellow(`${storeName} (${buCode})`));

    // lookup stock for skog in store
    try {
        const stock = await ingka.availability(buCode, '00402813') // 00402813 is code for skog
        console.log(lcl.green("[Stock Lookup - Success]"), "Found stock data for skog in store:", lcl.yellow(`${storeName} (${buCode})`));
        return {
            success: true,
            stock
        }
    } catch (e) {
        console.log(lcl.red("[Stock Lookup - Error]"), "Failed to get stock data for skog in store:", lcl.yellow(`${storeName} (${buCode})`));
        return {
            success: false,
            stock: {
                stock: 0
            }
        }
    }

}

module.exports = getStock;