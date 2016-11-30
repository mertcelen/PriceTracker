var express = require('express');
var router = express.Router();

/* GET home page. */
router.ps4 = function(req,res,next){
    res.redirect('/#ps4');
}

router.xbox = function(req,res,next){
    res.redirect('/#xbox');
}
module.exports = router;
