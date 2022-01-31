const workerpool = require('workerpool'),
    wpGetSkog = require('./skog/wpGetSkog');

    // collect skog data x 30 min
const wpSkog = () => {
    return wpGetSkog();
}

workerpool.worker({
    wpSkog
});