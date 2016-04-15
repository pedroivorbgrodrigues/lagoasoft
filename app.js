var favicon = require('serve-favicon');
var serveStatic = require('serve-static')
var bodyParser = require('body-parser');
var stylus = require('stylus');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var express = require('express');
var routes = require('./routes/index');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(stylus.middleware(__dirname + 'public'));
app.use(serveStatic(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.use('/', routes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
