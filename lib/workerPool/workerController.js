const lcl = require('cli-color'),
    workerpool = require('workerpool'),
    path = require('path');

let workerPool = null;

const init = async (options) => {
    const pool = workerpool.pool(path.join(__dirname, './createWorker.js'), options);
    workerPool = await pool.proxy();
    console.log(lcl.blue('[Worker - Info]'), `Started worker threads - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`);
}

const get = () => {
    return workerPool;
}

// export
exports.init = init;
exports.get = get;