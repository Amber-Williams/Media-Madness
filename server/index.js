const app = require('express')();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/central', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/central.html'));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});