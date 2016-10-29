var express = require('express');
var router = express.Router();
var tvshow = require('../models/tvshowSchema');

router.get('/', function(req, res, next) {
	tvshow.find(function(error,tvshow){
		res.json(tvshow);
	});
});
router.post('/',function(req,res){
	var newTvShow = new tvshow();

	newTvShow.tvName = req.body.tvName;
	newTvShow.tvGenre = req.body.tvGenre;
	newTvShow.tvImdb = req.body.tvImdb;
	newTvShow.tvPlayers= req.body.tvPlayers;
	newTvShow.tvScore = req.body.tvScore;
	newTvShow.weekDay = req.body.weekDay;

	newTvShow.save(function(error){
		if(error){
			res.json(error);
		}else{
			res.json(newTvShow);
		}
	});
});

router.delete('/',function(req,res){
	if(req.session.isAdmin === true){
		//TODO check if id defined or not.
		tvshow.findByIdAndRemove(req.body.id,function(error){
			if(error){
				res.json(error);
			}else{
				console.log("Tv Show " + req.body.id + " deleted.");
				res.json("Deleted");
			}
		});
	}else{
		res.send("NO WAY");
	}
});
module.exports = router;
