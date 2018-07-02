//Include all configurable settings files.
var databaseConfig    = require('./database'),
    storeConfig       = require('./store'),
    billingConfig     = require('./billing'),
    sessionConfig     = require('./session');
    // passport    = require('./passport');

module.exports = {
    db: databaseConfig,
    session: sessionConfig,
    store: storeConfig,
    payments: billingConfig
}