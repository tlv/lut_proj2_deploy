var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    if(req.session.user){
        res.redirect('home');
    }
    res.render('register', {warning: ''});
});

router.post("/", function(req, res){
    var db = req.db;
    var username = req.body.username;
    var password = req.body.password;

    //Username and password should not be blank
    if(!(username && password)){
        res.render('register', {warning: 'Username and password cannot be blank.'});
    }else{
        var users = db.get('users');

        users.find({'username': username}, {}, function(e, accounts){
            if(accounts.length == 0){
                users.insert({
                    'username': username,
                    'password': password
                }, function(err, doc){
                    if(err){
                        res.send("error");
                    }else{
                        req.session.user = username;
                        res.location('home');
                        res.redirect('home');
                    }
                });
            }else{
                res.render('register', {warning: 'Username already exists.'});
            }
        });
    }
});

module.exports = router;