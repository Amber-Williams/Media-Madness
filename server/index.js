const app = require('express')();
const io = require('socket.io')();
const port = 3000;


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message content', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.listen(port); 