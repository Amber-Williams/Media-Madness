const db = require('./../db');
const Play = require('./../models/playSchema');
const UserLog = require('./../models/userLogSchema');

const logUser = (username, socketId) => {
  const user = {
    username,
    socketId,
  }

  UserLog.collection.insertOne(user)
    .then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })
  return;
}

const play = (user, gif) => {
  const play = {
    user,
    gif,
    round: 0
  }

  Play.collection.insertOne(play)
    .then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })
  return;
}


const empty = () => {
  Play.collection.deleteMany({})
    .then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })

  UserLog.collection.deleteMany({})
    .then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })
  return;
}

module.exports = {
  logUser,
  play,
  empty
}