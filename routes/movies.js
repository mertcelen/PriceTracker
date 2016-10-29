var express = require('express');
var router = express.Router();
var movie = require('../models/movieSchema');
/* GET home page. */

router.get('/', function(req, res, next) {
	movie.find(function(error,movies){
		res.json(movies);
	});
});

router.post('/',function(req,res){
	var newMovie = new movie();
	newMovie.movieName = req.body.movieName;
	newMovie.movieGenre = req.body.movieGenre;
	newMovie.movieImdb = req.body.movieImdb;
	newMovie.moviePlayers= req.body.moviePlayers;
	newMovie.movieScore = req.body.movieScore;
	newMovie.releaseDate = req.body.releaseDate;

	newMovie.save(function(error){
		if(error){
			res.json(error);
		}else{
			res.json(newMovie);
		}
	});
});

router.delete('/',function(req,res){
	if(req.session.isAdmin === true){
		//TODO check if id defined or not.
		movie.findByIdAndRemove(req.body.id,function(error){
			if(error){
				res.json(error);
			}else{
				console.log("Movie " + req.body.id + " deleted.");
				res.json("Deleted");
			}
		});
	}else{
		res.send("NO WAY");
	}
});
module.exports = router;