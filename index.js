var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var count = 0;

fs.readFile('count', 'utf8', function(err, contents) {
    count = +contents;
});

io.on('connection', function(socket){

  io.emit("loaded", count);

  socket.on('button click', function(){
	count += 1;
	
	fs.writeFile('count', count);	
	io.emit('button click', count);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});