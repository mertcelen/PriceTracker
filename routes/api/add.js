var express = require('express');
var router = express.Router();
var sourceModel = require('../../models/sourceModel.js');
var gameModel = require('../../models/gameModel.js');

router.source = function(req, res, next) {

    if (req.session && req.session.isAdmin) {
        var temp = new sourceModel();

        temp.sourceName = req.body.sourceName;
        temp.sourceWebsite = req.body.sourceWebsite;
        temp.parseTag = req.body.parseTag;

        temp.save(function(error) {
            if (error) {
                res.json({
                    error: error
                });
            } else {
                res.json({
                    success: true
                })
            }
        });
    } else {
        res.json({
            error: "Access Denied"
        })
    }
};

router.game = function(req, res, next) {
    if (req.session && req.session.isAdmin) {
        var game = new gameModel();
        game.gameName = req.body.gameName;
        game.gameImageUrl = req.body.gameImageUrl;
        game.sources = JSON.parse(req.body.sources);
        game.platform = req.body.platform;

        game.save(function(error) {
            if (error) {
                res.json({
                    'error': error
                });
            } else {
                console.log('New game > ' + req.body.gameName);
                res.json({
                    success: "added"
                })
            }
        });
    } else {
        res.json({
            error: "Access Denied"
        })
    }
};

module.exports = router;
