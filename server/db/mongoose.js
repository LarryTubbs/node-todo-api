const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// get from configuration in the future
var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp';

mongoose.connect(dbUrl, { useNewUrlParser: true });

module.exports = {mongoose};