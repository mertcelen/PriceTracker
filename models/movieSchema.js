var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    movieName : {type:String, unique : true},
    movieGenre : String,
    movieImdb : {type:String, unique:true},
    moviePlayers : [{
        name: String
    }],
    movieScore : String,
    releaseDate : Date,
    added : {type:Date, default : Date.now}
});

module.exports = mongoose.model('movie', movieSchema);