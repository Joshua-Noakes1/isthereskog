const workerpool = require('workerpool');
require('./cron/createCron');

// collect skog data x 30 min
const wpSkog = async () => {
    return await require('./skog/wpGetSkog')();
}

workerpool.worker({
    wpSkog
});