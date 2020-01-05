const db = require('./../db');
const Play = require('./../models/playSchema');
const UserLog = require('./../models/userLogSchema');
const Room = require('./../models/roomSchema');
const questionData = require('./questions.json');

const logUser = async (username, socketId, roomId) => {
  const user = {
    username,
    socketId,
    roomId
  }
  try {
    await UserLog.collection.insertOne(user)
  } catch(e) {
    throw new Error(`An error occurred while creating a user: ${e}`);
  }
}

const loggedUser = async (roomId, username, socketId) => {
  try {
    const userLog = await UserLog.collection.findOneAndUpdate(
      {'roomId': roomId, 'username': username},
      { $set: { 'socketId': socketId }}
    );
    if (!userLog.value) return 'Room or user does not exist anymore'
    else return userLog;
  } catch(e) {
    throw new Error(`An error occurred while getting logged user: ${e}`);
  }
}

const loggedUsers = async (roomId) => {
  try {
    const userLog = await UserLog.collection.find({'roomId': roomId}).toArray();
    return userLog;
  } catch(e) {
    throw new Error(`An error occurred while getting logged users: ${e}`);
  }
}

const addRoom = async (roomId, socketIdOwner) => {
  const room = {
    roomId,
    socketIdOwner: socketIdOwner,
    userCount: 0,
    submittedCount: 0,
    voteCount: 0,
    round: 0,
    question: ''
  }
  try {
    await Room.collection.insertOne(room)
  } catch(e) {
    throw new Error(`An error occurred while creating a room: ${e}`);
  }
}

const removeRoom = async (roomId, socketIdOwner) => {
  try {
    await Room.collection.findOneAndDelete({'roomId': roomId, 'socketIdOwner': socketIdOwner});
  } catch(e) {
    throw new Error(`An error occurred while creating a room: ${e}`);
  }
}

const incRoomUserCount = async (roomId) => {
  try {
    const room = await Room.collection.findOneAndUpdate(
      {'roomId': roomId},
      {$inc: {'userCount': 1}},
      {returnOriginal:false}
    );
    return room.value;
  } catch(e) {
    throw new Error(`An error occurred while increasing room user count: ${e}`);
  }
}

const incRoomSubmittedCount = async (roomId) => {
  try {
    const room = await Room.collection.findOneAndUpdate(
      {'roomId': roomId},
      {$inc: {'submittedCount': 1}},
      {returnOriginal:false}
    );
    return room.value;
  } catch(e) {
    throw new Error(`An error occurred while increasing room user count: ${e}`);
  }
}
const incRoomVoteCount = async (roomId) => {
  try {
    const room = await Room.collection.findOneAndUpdate(
      {'roomId': roomId},
      {$inc: {'voteCount': 1}},
      {returnOriginal:false}
    );
    return room.value;
  } catch(e) {
    throw new Error(`An error occurred while increasing room user count: ${e}`);
  }
}

const startNewGameRoomChanges = async (roomId, question) => {
  try {
    const room = await Room.collection.findOneAndUpdate(
      {'roomId': roomId},
      {
        $inc: {'round': 1},
        $set: {'voteCount': 0, 'submittedCount': 0, 'question': question},
      },
      {returnOriginal:false}
    );
    return room.value;
  } catch(e) {
    throw new Error(`An error occurred while increasing room user count: ${e}`);
  }
}

const allRoomsList = async (roomId) => {
  try {
    const rooms = await Room.collection.find({'roomId': roomId});
    return rooms;
  } catch(e) {
    throw new Error(`An error occurred while getting room list: ${e}`);
  }
}


const play = async (user, gif, round, question, roomId) => {
  const play = {
    question,
    user,
    gif,
    round,
    votes: [],
    roomId
  }

  try {
    await Play.collection.insertOne(play)
  } catch(e) {
    throw new Error(`An error occurred while creating a play: ${e}`);
  }
}

const loggedPlays = async (roomId) => {
  try {
    const playLog = await Play.collection.find({'roomId': roomId}).toArray();
    return playLog;
  } catch(e) {
    throw new Error(`An error occurred while getting logged plays: ${e}`);
  }
}

const playVote = async (owner, play, voter, round, roomId) => {
  try {
    await Play.collection.findOneAndUpdate({'gif': play, 'user': owner, 'round': round, 'roomId': roomId}, {"$push": {'votes': voter}})
  } catch(e) {
    throw new Error(`An error occurred while creating a play vote: ${e}`);
  }
}

const empty = async () => {
  try {
    await Play.collection.deleteMany({})
  } catch(e) {
    throw new Error(`An error occurred while emptying play collection: ${e}`);
  }

  try {
    await UserLog.collection.deleteMany({})
  } catch(e) {
    throw new Error(`An error occurred while emptying user collection: ${e}`);
  }

  try {
    await Room.collection.deleteMany({})
  } catch(e) {
    throw new Error(`An error occurred while emptying room collection: ${e}`);
  }
}

const generateQuestion = () => {
  const filteredPickOne = questionData.blackCards.filter(quest => {
    if(quest.pick === 1){
      return quest;
    }
  });
  const question = filteredPickOne[ Math.floor(Math.random() * Math.floor(filteredPickOne.length-1))];

  return question.text;
}

const generateRoomId = () => {
  const alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const code = [];
  for (let i = 0; i < 4; i++){
    code.push(alp[Math.floor(Math.random() * Math.floor(alp.length-1))])
  }
  return code.join('');
}

module.exports = {
  logUser,
  play,
  empty,
  generateQuestion,
  loggedUser,
  loggedUsers,
  playVote,
  loggedPlays,
  generateRoomId,
  addRoom,
  removeRoom,
  allRoomsList,
  incRoomUserCount,
  startNewGameRoomChanges,
  incRoomSubmittedCount,
  incRoomVoteCount
}