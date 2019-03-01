const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const Play = require('./models/playSchema');
const UserLog = require('./models/userLogSchema');


app.use(bodyParser.json());
app.use(cors());

app.get('/api/user', (req, res) => { //Delete this later
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  console.log(req.body)
  res.send('Welcome')
})

function play(selectedGif){
  const user = {
    user: "test",
    gif: selectedGif,
    round: 0
  }

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

let userCount = 0;

io.on('connection', function(socket){
  userCount++;
  console.log(socket.id, 'connected');
  socket.on('login', function(user) {
    console.log(user, socket.id, 'login user sent')
    io.emit('login user', user, socket.id)
  })

  socket.on('chat message', function(msg){
    console.log(socket.id, "chat message sent")
    io.emit('chat message content', msg);
    play(msg.images.fixed_height.url)
  });

  socket.on('disconnect', function(){
    userCount--;
    console.log(socket.id, 'user disconnected');
    if(userCount === 0){
      empty() // This will need to be changed to trash when all users leave room, not each one
    }
  });
});

server.listen(port);