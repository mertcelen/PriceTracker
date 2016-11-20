var mongoose = require('mongoose');

var gameModel = new mongoose.Schema({
    gameName: String,
    gameImageUrl: String,
    sources: [{
        sourceName: String,
        sourceLink: String,
        price: String
    }],
    platform: { type: String, lowercase: true },
    added: { type: Date, default: Date.now },
    uniqueName: { unique: true, type: String, lowercase: true }
});

module.exports = mongoose.model('gameModel', gameModel);
