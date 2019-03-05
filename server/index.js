const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const methods = require('./helpers/helperFuncs');

app.use(bodyParser.json());
app.use(cors());

let activeRooms = ['abc'];

let question = methods.generateQuestion();

let userCount = 1;
let submittedCount = 1;
let voteCount = 1;

let round = 0;

io.on('connection', (socket) => {
  let roomCode = methods.generateRoomCode();
  activeRooms.push(roomCode);
  io.emit('game room code', roomCode);

  socket.on('start over', () =>{ 
    // need to add start over function here
  })

  socket.on('login', async (user, roomCodeEntered) => {
    if (activeRooms.includes(roomCodeEntered)){
      userCount++;
      methods.logUser(user, socket.id);
      io.emit('global users', await methods.loggedUsers());
      io.sockets.connected[socket.id].emit('personal login user', socket.id, user);

      socket.join("room-"+roomCodeEntered);
    } else {
      io.emit('room code does not exist')
    }
    
    //add function here to remove user generated roomCode from active rooms
  });

  socket.on('start game', () => {
    round++;
    question = methods.generateQuestion();
    submittedCount = 1;
    voteCount = 1;
    io.emit('game started', question);
  });

  socket.on('chat message', (user, msg) => {
    io.emit('chat message content', user, msg, round);
    methods.play(user, msg.images.fixed_height.url, round, question);
    submittedCount++;
    if (submittedCount >= userCount) { // will need to make a different way to show send submits since people could leave 
      io.emit('submitted a round');
    }
  });

  socket.on('user voted',  async (owner, play, voter, round) => {
      voteCount++;
      await methods.playVote(owner, play, voter, round);
      if (voteCount >= userCount) { // will need to make a different way to show send scores since people could leave
        io.emit('show votes',  await methods.loggedPlays() );
      } 
  });


  //  //Increase roomno 2 clients are present in a room.
  //  if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
  // socket.join("room-"+roomno);

  // //Send this event to everyone in the room.
  // io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);

  //socket.leave("room-"+roomno);

  socket.on('disconnect', () => {
    userCount--;
    if(userCount <= 0){
      methods.empty();
      userCount = 1;
      submittedCount = 1;
      voteCount = 1;
      round = 0;
      activeRooms = ['abc'];
    }
  });
});

server.listen(port);

