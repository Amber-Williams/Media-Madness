const mongoose = require('mongoose');


//Schema doesn't matter when posting to the database..need to debug
const roomSchema = new mongoose.Schema({
    roomId: String,
    socketIdOwner: String,
    userCount: Number,
    submittedCount: Number,
    voteCount: Number,
    round: Number,
    question: String
});
//Would like to implement time it took to select to create more robost scoring

module.exports = mongoose.model('Room', roomSchema);