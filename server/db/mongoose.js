const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// get from configuration in the future
var dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

module.exports = {mongoose};