const getStock = require('./ingka/getStock'),
    getStores = require('./ingka/getStores');

async function test() {
    console.log(await getStores());
    console.log(await getStock('461', 'Reading'));
}

test();