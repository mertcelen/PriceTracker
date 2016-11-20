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
    parseTag: "span[itemprop='price']",
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

            for (var index = 0; index < sources.length; index++) {
                parseData(game.gameName, sources[index].sourceLink, sourceArray[index].parseTag, sourceArray[index].sourceName);
            }
        }
    });
    // console.log('fonksiyon sonu');
}

var parseData = function(name, url, tag, where) {
    parser.env(
        url, ["http://code.jquery.com/jquery.js"],
        function(err, window) {
            if (err) {
                console.log(err);
            }
            var newPrice = window.$(tag).html();
            if (newPrice) {
                // newPrice = newPrice.split("€").join('');
                newPrice = newPrice.split("\t").join('');
                newPrice = newPrice.split("\n").join('');
            }
            console.log(name + " is " + newPrice + " in " + where);
        }
    );
}

module.exports = router;
