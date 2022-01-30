const lcl = require('cli-color'),
    afe = require('../../../lib/asyncForEach'),
    ingka = require('ikea-availability-checker');

async function isSokgInStock() {
    // get uk bucodes
    const storesGB = ingka.stores.findByCountryCode('GB');

    // stick bucodes in array
    const storesBU = []
    await afe(storesGB, async (store) => {
        storesBU.push(store.buCode);
    });

    // loop over bucodes to get availability of skog
    var skogStock;
    var storeBU = '560';
    try {
        skogStock = await ingka.availability('141', '00402813'); // 00402813 is GB code for skog
    } catch (err) {
        console.log(lcl.red("[Store - Error]"),`Failed to get availability for skog, store ${storeBU} may not carry him`);
    }

    console.log({
        storesGB,
        storesBU,
        skogStock,
        forcast: skogStock.forecast
    });
}

isSokgInStock();