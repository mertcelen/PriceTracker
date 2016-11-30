var express = require('express');
var router = express.Router();
var sourceModel = require('../../models/sourceModel');
var gameModel = require('../../models/gameModel');

router.game = function(req, res, next) {
    gameModel.find({ "gameName": req.params.name }, function(err, list) {
        if (err) {
            res.json(err);
        } else {
            res.json(list);
        }
    });
};

router.sources = function(req, res, next) {
    sourceModel.find(function(err, list) {
        if (err) {
            res.json(err);
        } else {
            var sources = [];
            for (var i = 0; i < list.length; i++) {
                sources.push(list[i].sourceName);
            }
            res.json(sources);
        }
    });
}

router.platform = function(req, res, next) {
    gameModel.find({ "platform": req.params.name }, function(err, list) {
        if (err) {
            res.json(err);
        } else {
            res.json(list);
        }
    })
}

router.all = function(req, res, next) {
    gameModel.find(function(err, list) {
        if (err) {
            res.json(err);
        } else {
            res.json(list);
        }
    });
};

module.exports = router;
