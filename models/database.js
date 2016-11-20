var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/PriceTracker');

var db = mongoose.connection;

db.on('error', function(err) {
    console.log('CANNOT CONNECT TO DATABASE', err);
});

console.log('Connected to database!');

module.exports = db;
