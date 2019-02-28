const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const Play = require('./playSchema');
const db = require('./db');

const user = {
  user: "test",
  gif: "imgurl.com/0jsdfij",
  round: 0
}

app.use(bodyParser.json());
app.use(cors());

app.get('/api/user', (req, res) => { //Delete this later
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  console.log(req.body)
  res.send('Welcome')
})

function play(){
  Play.collection.insertOne(user)
    .then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })
  return;
}

function empty(){
  Play.collection.deleteMany({})
    .then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })
return;
}

io.on('connection', function(socket){

  console.log(socket.id, 'connected');
  socket.on('login', function(user) {
    console.log(user, socket.id, 'login user sent')
    io.emit('login user', user, socket.id)
  })

  socket.on('chat message', function(msg){
    console.log(socket.id, "chat message sent")
    io.emit('chat message content', msg);
    play() //Only adding one to the database?
  });

  socket.on('disconnect', function(){
    console.log(socket.id, 'user disconnected');
    empty()
  });
});

server.listen(port);