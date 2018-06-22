// var express         = require('express'),
//     config          = require('../conf/config'),
//     session         = require('express-session'),
//     MongoStore      = require('connect-mongo')(session)
//     app             = express();

// //Configure Session
// let sessionConfig = {
//     secret: config.session.secret, //A random quote to use as hash
//     resave: true,
//     saveUninitialized: false,
//     cookie: {},
//     store: new MongoStore({
//         url: `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.dbName}`,
//         ttl: config.session.maxLife
//     }),
//     name: 'id',
//     maxAge: 1800000
// };
// //Set cookie.secure if in production (https)
// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1);
//     sessionConfig.cookie.secure = true;
// }

// //Initialize session and return to server.js
// module.exports = session(sessionConfig);

module.exports = (headers) => {
    if(headers && headers.authorization) {
        var temp = headers.authorization.split(' ');
        if (temp.length === 2) {
            return temp[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}