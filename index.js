var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var count = 0;

io.on('connection', function(socket){

  io.emit("loaded", count);

  socket.on('button click', function(){
	count += 1;
	io.emit('button click', count);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});