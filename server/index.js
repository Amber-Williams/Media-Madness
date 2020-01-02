const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const methods = require('./helpers/helperFuncs');

app.use(bodyParser.json());
app.use(cors());

let activeRooms = [];
let appUserCount = 0;

io.on('connection', (socket) => {
  console.log('Socket connection started')
  appUserCount++;
  let roomId = methods.generateRoomId();
  socket.join("room-"+roomId);
  const room = {
    roomId,
    userCount: 0,
    submittedCount: 0,
    voteCount: 0,
    round: 0,
    question: ''
  }
  activeRooms.push(room);
  io.sockets.in("room-"+roomId).emit('game room code', roomId);


  socket.on('start over', () =>{
    // need to add start over function here
  })

  socket.on('login', async (user, roomIdEntered) => {
    console.log('User logged in')
    const currentRoom = activeRooms.find(room => room.roomId === roomIdEntered)
    if (currentRoom) {
      currentRoom.userCount++;
      await methods.logUser(user, socket.id, roomIdEntered);
      socket.join("room-"+roomIdEntered);
      io.sockets.connected[socket.id].emit('personal login user', user, socket.id, roomIdEntered);
      io.sockets.in("room-"+roomIdEntered).emit('global users', await methods.loggedUsers(roomIdEntered), roomIdEntered);
    } else {
      io.sockets.connected[socket.id].emit('room code does not exist');
    }
    //TTD add function here to remove user generated roomId from active rooms ...ifCurrentRoom.userCount <=0 ...delete
  });

  socket.on('Does room still exist? If so update with new socketID and rejoin', async (roomID, username) => {
    //relogin user on reload
    const loggedUser = await methods.loggedUser(roomID, username, socket.id)
    if (loggedUser === 'Room or user does not exist anymore'){
      socket.emit('remove localStorage userLogInfo')
    } else {
      const userLogInfo = {
        username,
        'socketID': socket.id,
        roomID
      }
      socket.emit('update localStorage userLogInfo', userLogInfo)
    }
  });

  socket.on('start game', (roomId) => {
    console.log('Game started')
    const currentRoom = activeRooms.find(room => room.roomId === roomId);
    if (currentRoom) {
      currentRoom.round++;
      currentRoom.question = methods.generateQuestion();
      currentRoom.voteCount = 0;
      currentRoom.submittedCount = 0;
      io.sockets.in("room-"+roomId).emit('game started', currentRoom.question);
    }
  });

  socket.on('chat message', (user, msg, roomId) => {
    console.log('chat message recieved')
    const currentRoom = activeRooms.find(room => room.roomId === roomId);
    if (currentRoom) {
      io.sockets.in("room-"+roomId).emit('chat message content', user, msg, currentRoom.round);
      methods.play(user, msg.images.fixed_height.url, currentRoom.round, currentRoom.question, roomId);
      currentRoom.submittedCount++;
      if (currentRoom.submittedCount >= currentRoom.userCount) {
        io.sockets.in("room-"+roomId).emit('submitted a round');
      }
    }
  });

  socket.on('user voted',  async (owner, play, voter, round, roomId) => {
    console.log('user voted')
    const currentRoom = activeRooms.find(room => room.roomId === roomId);
    if (currentRoom) {
      currentRoom.voteCount++;
      await methods.playVote(owner, play, voter, round, roomId);
      if (currentRoom.voteCount >= currentRoom.userCount) {
        io.sockets.in("room-"+roomId).emit('show votes',  await methods.loggedPlays(roomId) );
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
    appUserCount--;
    if(appUserCount <= 0){
      methods.empty();
      activeRooms = [];
      appUserCount = 0;
    }
  });
});

server.listen(port);

