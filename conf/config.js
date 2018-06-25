var databaseConfig    = require('./database'),
    storeConfig       = require('./store'),
    sessionConfig     = require('./session');
    // passport    = require('./passport');

module.exports = {
    db: databaseConfig,
    session: sessionConfig,
    store: storeConfig
}