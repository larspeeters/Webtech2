
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var jade = require("jade");
var user = require('./routes/user');
var app = express.createServer();
var http = require('http'), server = http.createServer(app)  , io = require('socket.io').listen(app);
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/', function(req, res){
  res.render('index.jade');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Handle the socket.io connections

var users = 0; //count the 
var socket = io.connect();
io.sockets.on('connection', function (socket) {
socket.on('setPseudo', function (data) {
    socket.set('pseudo', data);
});


socket.on('message', function (message) {
    socket.get('pseudo', function (error, name) {
        var data = { 'message' : message, pseudo : name };
        socket.broadcast.emit('message', data);
        console.log("user " + name + " send this : " + message);
    })
});
});