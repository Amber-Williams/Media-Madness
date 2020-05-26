const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const methods = require('./helpers/helperFuncs');

app.use(bodyParser.json());
app.use(cors());

let appUserCount = 0;

io.on('connection', async (socket) => {
  console.log('Socket connection started')
  appUserCount++;
  let roomId = methods.generateRoomId();
  socket.join("room-"+roomId);
  await methods.addRoom(roomId, socket.id);
  io.sockets.in("room-"+roomId).emit('game room code', roomId);

  socket.on('start over', () => {
    // need to add start over function here
  })

  socket.on('login', async (user, roomIdEntered) => {
    console.log('User logged in')
    const currentRoom = await methods.incRoomUserCount(roomIdEntered);
    if (currentRoom) {
      await methods.logUser(user, socket.id, roomIdEntered);
      socket.join("room-"+roomIdEntered);
      io.sockets.connected[socket.id].emit('personal login user', user, socket.id, roomIdEntered);
      io.sockets.in("room-"+roomIdEntered).emit('global users', await methods.loggedUsers(roomIdEntered), roomIdEntered);
    } else {
      io.sockets.connected[socket.id].emit('room code does not exist');
    }
  });

  socket.on('Does room still exist? If so update with new socketID and rejoin', async ({roomID, username}) => {
    //relogin user on reload
    const loggedUser = await methods.loggedUser(roomID, username, socket.id)
    if (loggedUser === 'Room or user does not exist anymore') {
      socket.emit('remove localStorage userLogInfo')
    } else {
      const userLogInfo = {
        username,
        'socketID': socket.id,
        roomID
      }
      socket.emit('update localStorage userLogInfo', userLogInfo)
      socket.join("room-"+roomID);

      io.in("room-"+roomID).clients((err, clients) => {
        console.log(`----USER REJOINED---- \n User: ${username} \n Socket: ${socket.id} \n Room: ${roomID} \n Room List: ${clients}`);
      });
    }
  });

  socket.on('start game', async (roomId) => {
    console.log('Game started')
    const question = methods.generateQuestion();
    const currentRoom = await methods.startNewGameRoomChanges(roomId, question)
    if (currentRoom) {
      io.sockets.in("room-"+roomId).emit('game started', question);
    }
  });

  socket.on('chat message', async (user, msg, roomId) => {
    console.log('chat message recieved')
    const currentRoom = await methods.incRoomSubmittedCount(roomId);
    if (currentRoom) {
      io.sockets.in("room-"+roomId).emit('chat message content', user, msg, currentRoom.round);
      methods.play(user, msg.images.fixed_height.url, currentRoom.round, currentRoom.question, roomId);
      if (currentRoom.submittedCount >= currentRoom.userCount) {
        io.sockets.in("room-"+roomId).emit('submitted a round');
      }
    }
  });

  socket.on('user voted',  async (owner, play, voter, round, roomId) => {
    io.in("room-"+roomId).clients((err, clients) => {
      console.log(`----USER VOTED---- \n User: ${voter} \n Socket: ${socket.id} \n Room: ${roomId} \n Room List: ${clients}`);
    });
    console.log('user voted');
    const currentRoom = await methods.incRoomVoteCount(roomId);
    if (currentRoom) {
      await methods.playVote(owner, play, voter, round, roomId);
      if (currentRoom.voteCount >= currentRoom.userCount) {
        io.sockets.in("room-"+roomId).emit('show votes',  await methods.loggedPlays(roomId) );
      }
    }
  });

  socket.on('disconnect', async () => {
    console.log('user disconnected')
    await methods.removeRoom(roomId, socket.id);
    appUserCount--;
    if (appUserCount <= 0) {
      methods.empty();
      appUserCount = 0;
    }
  });
});

console.log('server on port:', port)
app.get('/', (req, res) => res.send('Hello from Media Madness!'))


server.listen(port);