var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Wiki home page');
});


// About page route.
router.get("/about", function (req, res) {
    res.send("About this wiki");
});

router.post('/', function(req, res){
    res.send('POST request to homepage')
})

module.exports = router;
