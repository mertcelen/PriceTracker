var mongoose = require('mongoose');

var tvShowSchema = new mongoose.Schema({
    tvName : {type:String, unique : true},
    tvId : {type:String, unique : true},
    tvGenre : String,
    tvImdb : {type:String, unique:true},
    tvPlayers : [{
        name: String
    }],
    tvScore : String,
    weekDay : String,
    added : {type:Date, default : Date.now}
});

module.exports = mongoose.model('tvShow', tvShowSchema);