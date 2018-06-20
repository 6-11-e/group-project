var config = {
    db: {
        host: 'ds163630.mlab.com',
        port: '63630',
        dbName: 'group-project',
        user: 'api',
        pass: 'E9908b0c96'
    },
    session: {
        secret: 'You are not PREPARED! -Illidan Stormrage',
        maxLife: 14 * 24 * 60 * 60 //Days|Hours|Minutes|Seconds (default 14 days)
    }
};

module.exports = config;