const mongoose = require('mongoose');


//Schema doesn't matter when posting to the database..need to debug
const playSchema = new mongoose.Schema({
    question: String,
    user: String,
    gif: String,
    round: Number,
    votes: Array,
    roomId: String
});
//Would like to implement time it took to select to create more robost scoring

module.exports = mongoose.model('Play', playSchema);