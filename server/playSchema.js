const mongoose = require('mongoose');


//Schema doesn't matter when posting to the database..need to debug
const playSchema = mongoose.Schema({
    user: String,
    gif: String,
    round: Number
});

module.exports = mongoose.model('Play', playSchema);