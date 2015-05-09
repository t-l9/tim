var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var config     = require('./config');
var path       = require('path');
var secret     = config.secret;

//---------------------------------------
//  basic setup
//---------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//---------------------------------------
//  cors config
//---------------------------------------
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

//---------------------------------------
//  log all requests
//---------------------------------------
app.use(morgan('dev'));

//---------------------------------------
//  DB
//---------------------------------------
mongoose.connect(config.database);

//---------------------------------------
//  basic route
//---------------------------------------
app.use(express.static(__dirname + '/public'));

//---------------------------------------
//  get router instance & api prefix
//---------------------------------------
var apiRouter = require('./app/routes/api')(app, express);
app.use('/api', apiRouter);

//---------------------------------------
//  basic auth
//---------------------------------------
app.get('/admin', require('quick-login')(function checkAuth(data, next){
  next(null, data.name === 'timlauter' &&
    data.pass === 'moes-tavern')
}))


//---------------------------------------
//  catchall requests not handles by node
//---------------------------------------
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//---------------------------------------
//  start server
//---------------------------------------
app.listen(config.port);
console.log('---------------------------------');
console.log('...Started on port ' + config.port);
