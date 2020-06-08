const mongoose = require('mongoose');
const config = require('./');

mongoose.Promise = global.Promise;

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
