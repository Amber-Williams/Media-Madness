const db = require('./../db');
const Play = require('./../models/playSchema');
const UserLog = require('./../models/userLogSchema');
const questionData = require('./questions.json');

const logUser = async (username, socketId) => {
  const user = {
    username,
    socketId,
  }
  try {
    await UserLog.collection.insertOne(user)
  } catch(e) {
    throw new Error(`An error occurred while creating a user: ${e}`);
  }
}

const loggedUsers = async () => {
  try {
    const userLog = await UserLog.collection.find({}).toArray();
    return userLog;
  } catch(e) {
    throw new Error(`An error occurred while getting logged users: ${e}`);
  }
}

const play = async (user, gif, round, question) => {
  const play = {
    question,
    user,
    gif,
    round,
    votes: []
  }

  try {
    await Play.collection.insertOne(play)
  } catch(e) {
    throw new Error(`An error occurred while creating a play: ${e}`);
  }
}

const loggedPlays = async () => {
  try {
    const playLog = await Play.collection.find({}).toArray();
    return playLog;
  } catch(e) {
    throw new Error(`An error occurred while getting logged plays: ${e}`);
  }
}

const playVote = async (owner, play, voter, round) => {
  try {
    await Play.collection.findOneAndUpdate({'gif': play, 'user': owner, 'round': round}, {"$push": {'votes': voter}})
  } catch(e) {
    throw new Error(`An error occurred while creating a play vote: ${e}`);
  }
}

const empty = async () => {
  try {
    await Play.collection.deleteMany({})
  } catch(e) {
    throw new Error(`An error occurred while emptying play log: ${e}`);
  }

  try {
    await UserLog.collection.deleteMany({})
  } catch(e) {
    throw new Error(`An error occurred while emptying user log: ${e}`);
  }
}

const generateQuestion = () => {
  const filteredPickOne = questionData.blackCards
  .filter(quest => {
    if(quest.pick === 1){
      return quest;
    }
  });
  const question = filteredPickOne[ Math.floor(Math.random() * Math.floor(filteredPickOne.length-1))];

  return question.text;
}
const generateRoomCode = () => {
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
  loggedUsers,
  playVote,
  loggedPlays,
  generateRoomCode
}