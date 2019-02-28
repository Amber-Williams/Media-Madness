const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');


// how to send and recieve information for clientside to server side?
// how to create authentication token per each user?

app.use(bodyParser.json());
app.use(cors());


app.get('/api/user', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  console.log(req.body)
  res.send('Welcome')
})



io.on('connection', function(socket){
  
  console.log(socket.id, 'connected');
  socket.on('login', function(user) {
    console.log(user, socket.id, 'login user sent')
    io.emit('login user', user, socket.id)
  })

  socket.on('chat message', function(msg){
    console.log(socket.id, "chat message sent")
    io.emit('chat message content', msg);
  });

  socket.on('disconnect', function(){
    console.log(socket.id, 'user disconnected');
  });
});

server.listen(port);