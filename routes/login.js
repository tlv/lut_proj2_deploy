var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    if(req.session.user){
        res.redirect('home')
    }
    res.render('login', {warning: ''});
});

router.post('/', function(req, res){
    var db = req.db;
    var username = req.body.username;
    var password = req.body.password;

    var users = db.get('users');

    users.find({'username': username, 'password':password}, {}, function(e, accounts){
        //No matching accounts found
        if(accounts.length == 0){
            res.render('login', {warning: 'Invalid username/password combination.'});
        }else{
            req.session.user = accounts[0].username;
            res.location('home');
            res.redirect('home');
        }
    });
});

module.exports = router;