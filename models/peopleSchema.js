var mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
    name : String,
    surname : String,
    uniqueName : {type:String,unique:true},
    imdbId :  String,
    isMale : Boolean,
    added : {type:Date, default : Date.now}
});

module.exports = mongoose.model('people', peopleSchema);