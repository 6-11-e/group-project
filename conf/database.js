config = {
    host: 'ds163630.mlab.com',
    port: '63630',
    dbName: 'group-project',
    user: 'api',
    pass: 'E9908b0c96'
}

config['uri'] = `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.dbName}`

module.exports = config