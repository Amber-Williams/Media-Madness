const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const methods = require('./helpers/helperFuncs');

app.use(bodyParser.json());
app.use(cors());

let userCount = 0;

io.on('connection', function(socket){
  userCount++;
  
  socket.on('login', function(user) {
    io.emit('login user', user, socket.id);
    methods.logUser(user, socket.id)
  })

  socket.on('chat message', function(user, msg){
    io.emit('chat message content', msg);
    methods.play(user, msg.images.fixed_height.url)
  });

  socket.on('disconnect', function(){
    userCount--;
    if(userCount === 0){
      methods.empty();
    }
  });
});

server.listen(port);

