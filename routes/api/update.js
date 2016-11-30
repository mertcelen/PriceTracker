var express = require('express');
var router = express.Router();
var sourceModel = require('../../models/sourceModel');
var gameModel = require('../../models/gameModel');
var parser = require('jsdom');
var async = require('async');
var sourceArray = [];

router.one = function (req, res) {
    updateGamePrices(req, res);
}

function updateGamePrices(req, res) {
    if (req.session && req.session.isAdmin) {
        var gameName = req.params.name, output = [], needUpdate = false, game, gameId;

        gameModel.findOne({"gameName": gameName}, function (err, temp) {
            if (err || temp == null) {
                res.json({
                    error: "Game not found"
                })
            } else {
                var sources = temp.sources;
                game = temp;
                //let's get source tags from db
                sourceModel.find(function (error, data) {
                    if (error) {
                        res.json({
                            error: true
                        })
                    } else {
                        //    now we get source tags, we can continue.
                        sourceArray = data;

                        async.forEachOf(sourceArray, function (value, key, callback) {
                            parser.env(
                                sources[key].sourceLink, ["http://code.jquery.com/jquery.js"],
                                function (err, window) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    var newPrice = window.$(sourceArray[key].parseTag).html();
                                    if (newPrice) {
                                        newPrice = newPrice.split("€").join('');
                                        newPrice = newPrice.split("\t").join('');
                                        newPrice = newPrice.split("\n").join('');
                                    }
                                    var text = game.gameName + " is " + newPrice + " in " + sourceArray[key].sourceName;
                                    output.push(text);
                                    console.log(text);
                                    if (needUpdate || game.sources[key].price != newPrice) {
                                        needUpdate = true;//need to update data since price changed.
                                        temp.sources[key].price = newPrice;
                                    }
                                    callback();
                                }
                            );
                        }, function (error) {
                            if (error) {
                                res.json({
                                    error: true
                                });
                            } else {
                                res.json({
                                    results: output
                                })
                                //    now we can update the database as well.
                                if (needUpdate) {//no need to update if prices are same.
                                    console.log("Prices changed for " + gameName);
                                    temp.save(function (error) {
                                        if (error) throw error;
                                        console.log("Prices update in db for " + gameName);
                                    })
                                }
                            }
                        });

                    }
                });
            }
        });
    }else {
        res.json({
            error : "Not allowed!"
        })
    }
}

module.exports = router;
