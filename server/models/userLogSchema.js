const mongoose = require('mongoose');


//Schema doesn't matter when posting to the database..need to debug
const userLogSchema = mongoose.Schema({
    username: String,
    socketId: String,
});

module.exports = mongoose.model('UserLog', userLogSchema);