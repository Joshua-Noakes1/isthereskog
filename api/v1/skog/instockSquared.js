const getStock = require('./ingka/getStock'),
    getStores = require('./ingka/getStores');

async function test() {
    console.log(await getStores('US'));
    console.log(await getStock('560', 'WI, Oak Creek'));
}

test();