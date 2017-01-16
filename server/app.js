var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";

var server = http.listen(port, ip, function(){
    console.log('Listening in port %d', server.address().port);
});

// server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  socket.on('msg', function (data) {
    console.log(data);
    // socket.broadcast.emit(data);
    socket.broadcast.emit('msg', data);
    // emit to sender too
    socket.emit('msg', data);
  });  
  
});

