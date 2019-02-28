const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/react-auth';

mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});