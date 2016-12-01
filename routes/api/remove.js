var express = require('express');
var router = express.Router();
var sourceModel = require('../../models/sourceModel');
var gameModel = require('../../models/gameModel');

router.one = function(req, res, next) {
    if (req.session && req.session.isAdmin) {
        gameModel.findOneAndRemove({ "gameName": req.params.name }, function(err, list) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    success : true
                })
            }
        });
    }else{
        res.json({
            error : "Not allowed"
        })
    }

};

module.exports = router;
