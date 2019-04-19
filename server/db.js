const mongoose = require('mongoose');
require('dotenv').config();
const mongo_uri = process.env.MLAB_URL|| 'mongodb://localhost/game_data';
// const mongo_uri = 'mongodb://localhost/game_data';

mongoose.connect(mongo_uri, { useNewUrlParser: true } );