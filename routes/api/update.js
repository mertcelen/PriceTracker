var express = require('express');
var router = express.Router();
var sourceModel = require('../../models/sourceModel');
var gameModel = require('../../models/gameModel');
var request = require('request');
var parser = require('jsdom');
var sourceArray = [{
    parseTag: "#Asellprice",
    sourceName: "WeBuy"
}, {
    parseTag: ".valuteCont.pricetext",
    sourceName: "GameStop"
}, {
    parseTag: 'meta[itemprop="price"]',
    sourceName: "Smyths Toys"
}]

router.one = function(req, res, next) {
    updateGame(req, res);
}

function updateGame(req, res) {
    var gameName = req.params.name;

    gameModel.find({ "gameName": gameName }, function(err, temp) {

        var game = temp[0];
        if (err) {
            res.json({
                error: "Game not found"
            })
        } else {
            // console.log('Oyun bulundu');
            var id = game._id;
            var sources = game.sources;

            for (var index = 0; index < 2; index++) {
                // console.log("Getting new price in " + sources[index].sourceName);
                // console.log("LINK > " + sources[index].sourceName);
                // console.log("TAG > " + sourceArray[index].parseTag);


                parser.env(
                    sources[index].sourceLink, ["http://code.jquery.com/jquery.js"],
                    function(err, window) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(window);
                        var tag = sourceArray[index].parseTag;
                        var newPrice = window.$(tag).text();
                        console.log(newPrice + " in " + sources[index].sourceName);
                    }
                );
            }
        }
    });
    // console.log('fonksiyon sonu');
}

module.exports = router;
