var express = require('express');
var router = express.Router();
var people = require('../models/peopleSchema');

router.get('/', function(req, res, next) {
	people.find(function(error,people){
		res.json(people);
	});
});

router.post('/',function(req,res){
	var newPeople = new people();
	
	newPeople.name = req.body.name;
	newPeople.surname = req.body.surname;
	newPeople.uniqueName = req.body.name + req.body.surname;
	newPeople.imdbId = req.body.imdbId;
	newPeople.isMale= req.body.isMale;

	newPeople.save(function(error){
		if(error){
			res.json(error);
		}else{
			res.json(newPeople);
		}
	});
});

router.delete('/',function(req,res){
	if(req.session.isAdmin === true){
		//TODO check if id defined or not.
		people.findByIdAndRemove(req.body.id,function(error){
			if(error){
				res.json(error);
			}else{
				console.log("People " + req.body.id + " deleted.");
				res.json("Deleted");
			}
		});
	}else{
		res.send("NO WAY");
	}
});
module.exports = router;
