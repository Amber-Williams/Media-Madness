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
    throw new Error(`An error occurred while creating a user: ${e}`);
  }
}

const play = async (user, gif) => {
  const play = {
    user,
    gif,
    round: 0
  }

  try {
    await Play.collection.insertOne(play)
  } catch(e) {
    throw new Error(`An error occurred while creating a play: ${e}`);
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

module.exports = {
  logUser,
  play,
  empty,
  generateQuestion,
  loggedUsers
}