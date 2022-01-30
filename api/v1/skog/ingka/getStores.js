const lcl = require('cli-color'),
    ingka = require('ikea-availability-checker');

async function getStores(ISOCode) {
    // log lookup
    console.log(lcl.blue("[Store Lookup - Info]"), "Looking up stores for country code:", lcl.yellow(ISOCode || "GB"));

    // get stores for country code, if no country code is passed use GB
    try {
        const stores = await ingka.stores.findByCountryCode(ISOCode || 'GB');

        // country code doesnt exist 0 stores returned
        if (stores.length <= 0) {
            console.log(lcl.red("[Store Lookup - Error]"), "Failed to get stores for country code:", lcl.yellow(ISOCode || "GB"));
            return {
                success: false
            }
        }

        // return stores
        console.log(lcl.green("[Store Lookup - Success]"), "Found stores for country code:", lcl.yellow(ISOCode || "GB"));
        return {
            success: true,
            stores
        }
    } catch (e) {
        console.log(lcl.red("[Store Lookup - Error]"), "Failed to get stores for country code:", lcl.yellow(ISOCode || "GB"));
        return {
            success: false
        }
    }
}

module.exports = getStores;