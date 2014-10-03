var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    if(req.session.user){
        req.session.destroy(function(err){});
    }
    res.location('login');
    res.redirect('login');
});

module.exports = router;