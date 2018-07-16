// module imports
var express         = require('express'),
    path            = require('path'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    cors            = require('cors'),
    app             = express();
    // fileUpload      = require('express-fileupload');
    // busboy          = require('connect-busboy');



//Initialize session
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(passport.initialize());
app.use(cors())
// app.use(fileUpload())
// PRODUCTION ONLY
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/images', express.static('images'));

// Serve static images by /images[/...subfolders]/ImageName.png
// app middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//Init DB Session
app.use( (req, res, next) => {
   var mongoose = require('mongoose');
   let db = require('./conf/database');
   mongoose.connect(db.uri)
   next();
})
//Link to ./controllers/index.js
app.use('/api', require('./controllers'))

//Errors
// app.use( (req, res, next) => {
//     console.error('Error 404: ', req.originalUrl);
//     let msg = {
//         status: 'error',
//         message: 'Error 404 - Resource was not found'
//     };
//     res.type('json')
//     res.status(404).json(msg);
// })

// PRODUCTION ONLY
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



// Development mode port
const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log('Server is live on port ' + port + '\nCtrl+C to stop.');
})

module.exports = app;
