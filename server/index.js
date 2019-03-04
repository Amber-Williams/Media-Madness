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

let question = methods.generateQuestion();

let voteCount = 1;
io.on('connection', function(socket){
  userCount++;
  console.log('conntect', userCount)
  //io.of('/namespace').on('connect', (user))=>{function here}
  socket.on('login', async function(user) {
    methods.logUser(user, socket.id);
    io.emit('global users', question, await methods.loggedUsers());
    io.sockets.connected[socket.id].emit('personal login user', socket.id, user);
  })

  socket.on('chat message', function(user, msg){
    io.emit('chat message content', user, msg);
    methods.play(user, msg.images.fixed_height.url);
    
  });

  socket.on('start game', function(){
    io.emit('game started');
  });

  socket.on('submitted round', () => {
    io.emit('submitted a round');
   
  })

  socket.on('user voted',  async (owner, play, voter) => {
      voteCount++;
      await methods.playVote(owner, play, voter);
      if (voteCount >= userCount) { //will need to make a different way to show send scores since people could leave ...LOGGED USERS HELPER FUNC
        io.emit('show votes',  await methods.loggedPlays() );
      } 
  })

  socket.on('disconnect', function(){
    userCount--;
    console.log('disconnct', userCount)
    if(userCount <= 1){
      methods.empty();
      voteCount = 1;
      userCount = 0;
    }
  });
});

server.listen(port);

