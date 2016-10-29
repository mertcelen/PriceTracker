var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    if(req.session.isAdmin === true){
        console.log("User is ADMIN FROM SESSION");
        res.render('admin',{
            denied : false,
            wrong: false
        });
    }else{
        console.log("User NOT admin from session");
        res.render('admin',{
            denied : true,
            wrong: false
        });
    }
});

router.post('/',function(req,res){
    var password = req.body.password;
    if(password == "iamadmin"){
        console.log('user IS ADMIN from POST');
        res.render('admin',{
            denied : false,
            wrong: false
        });
        req.session.isAdmin = true;
    }else{
        console.log("Wrong PASSWORD");
        res.render('admin',{
            denied : true,
            wrong: true
        });
    }
});

module.exports = router;