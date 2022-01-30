const lcl = require('cli-color'),
    ingka = require('ikea-availability-checker');

async function getStores(ISOCode) {
    // log lookup
    console.log(lcl.blue("[Store - Lookup]"), "Looking up stores for country code:", ISOCode || "GB");

    // get stores for country code, if no country code is passed use GB
    try {
        return {
            success: true,
            stores: await ingka.stores.findByCountryCode(ISOCode || 'GB')
        }
    } catch (e) {
        return {
            success: false
        }
    }
}

module.exports = getStores;