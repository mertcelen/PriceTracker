var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/funDB');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('CANNOT CONNECT TO DATABASE', err);
});

module.exports = db;