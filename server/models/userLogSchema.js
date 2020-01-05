const mongoose = require('mongoose');


//Schema doesn't matter when posting to the database..need to debug
const userLogSchema = new mongoose.Schema({
    username: String,
    socketId: String,
    roomId: String
});

module.exports = mongoose.model('UserLog', userLogSchema);