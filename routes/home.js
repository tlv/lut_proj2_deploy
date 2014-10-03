var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    if(!req.session.user){
        res.redirect('login');
    }else{
        var username = req.session.user;
        var db = req.db;
        var posts = db.get('posts');

        posts.find({}, {}, function(err, doc){
            res.render('home', {username: username, posts:doc});
        });
    }
});

router.post("/", function(req, res){
    if(!req.session.user){
        res.redirect('login');
    }else{
        var db = req.db;
        var author = req.session.user;
        var content = req.body.content;

        var posts = db.get('posts');

        posts.insert({
            'author': author,
            'content': content
        },function(err, doc){
            if(err){
                res.send("Error");
            }else{
                res.redirect("home");
            }
        })
    }
});

module.exports = router;