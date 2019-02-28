const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/game_data';


mongoose.connect(mongo_uri, { useNewUrlParser: true } );