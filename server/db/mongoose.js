const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// get from configuration in the future
var dbUrl = 'mongodb://localhost:27017/ToDoApp';

mongoose.connect(dbUrl);

module.exports = {mongoose};