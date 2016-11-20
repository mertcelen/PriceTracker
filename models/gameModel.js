var mongoose = require('mongoose');

var gameModel = new mongoose.Schema({
    gameName: { type: String, unique: true },
    gameImageUrl: String,
    sources: [{
        sourceName: String,
        sourceLink: String,
        price: String
    }],
    platform: String,
    added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('gameModel', gameModel);
