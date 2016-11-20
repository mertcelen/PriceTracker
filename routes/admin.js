var express = require('express');
var router = express.Router();
var sourceModel = require('../models/sourceModel');
router.get('/', function(req, res) {
    if (req.session && req.session.isAdmin) {
        var sources = [];
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log("Admin connected from SESSION : " + ip);
        sourceModel.find(function(err, list) {

            for (var i = 0; i < list.length; i++) {
                sources.push(list[i].sourceName);
            }
            res.render('admin', {
                denied: false,
                wrong: false,
                list: sources
            });
        });
    } else if (req.query.wrong) {
        res.render('admin', {
            denied: true,
            wrong: true
        });
    } else {
        res.render('admin', {
            denied: true,
            wrong: false
        });
    }
});

router.post('/', function(req, res) {
    var password = req.body.password;
    var flag = true;
    if (password == "iamadmin") {
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log("Admin connected from POST : " + ip);
        req.session.isAdmin = true;
    } else {
        req.session.isAdmin = false;
        flag = false;
        res.redirect('/admin?wrong=true');
    }
    if (flag) {
        res.redirect('/admin');
    }
});

router.delete('/', function(req, res) {
    if (req.session && req.session.isAdmin) {
        req.session.isAdmin = false;
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log('Admin disconnected from DELETE : ' + ip);
        res.send('ok');
    }
});
module.exports = router;
