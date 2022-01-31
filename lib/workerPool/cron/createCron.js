const lcl = require('cli-color'),
    {
        CronJob
    } = require('cron'),
    workerpool = require('../workerController');

// do a speedtest every x minutes
const startCronSkog = new CronJob('*/15 * * * * *', async function () { 
    var workerPool = workerpool.get();
    await workerPool.wpSkog();
});

startCronSkog.start();