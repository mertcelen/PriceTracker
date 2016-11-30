var mongoose = require('mongoose');

var sourceModel = new mongoose.Schema({
    sourceName: { type: String, unique: true },
    parseTag: String,
    added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('sourceModel', sourceModel);
