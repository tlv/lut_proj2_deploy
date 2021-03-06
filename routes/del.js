var express = require('express');
var router = express.Router();

router.get("/:id", function(req, res){
    var postid = req.params.id;

    //URL suffix should correspond to something that could actually be a post. 
    //Otherwise, when we read it and try to feed it into the database, it breaks.
    if(!(postid && postid.length === 24 && postid.match(/[0-9|a-f]{24}/))){
        res.send("Malformed post ID.");
    }else{
        var db = req.db;
        var username = req.session.user;
        var posts = db.get('posts');

        posts.findById(postid, function(err, thepost){
            if(thepost){
                var author = thepost.author;

                //Logged in as someone besides the post author.
                if(author !== username){
                    res.send("You do not have permission to access this post.");
                }else{
                    res.render('del', {thepost: thepost});
                }
            }else{
                res.send("Post not found.");
            }
        });
    }
});

router.post("/", function(req, res){
    console.log(req.body);
    if(req.body.no === ''){
        console.log("NO");
        res.location('home');
        res.redirect('home');
    }else{
        //URL suffix should correspond to something that could actually be a post. 
        //Otherwise, when we read it and try to feed it into the database, it breaks.
        if(!(postid && postid.match(/[0-9|a-f]{24}/))){
            res.send("Malformed post ID.");
        }else{
            postid = postid.match(/[0-9|a-f]{24}/)[0];
            var postid = req.body.postid;
            postid = postid.substring(0,24);

            var db = req.db;
            var posts = db.get('posts');
            var username = req.session.user;

            posts.findById(postid, function(err, thepost){
                var author = thepost.author;
                
                //Logged in as someone besides the post author.
                if (username !== author){
                    res.send("You do not have permission to access this post.");
                }else{
                    posts.remove({_id: postid}, function(){
                        res.location('home');
                        res.redirect('home');
                    });

                }
            });
        }
    }
});

module.exports = router;