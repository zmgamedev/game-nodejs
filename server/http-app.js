var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1"

app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});