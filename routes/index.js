var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html', { title: 'Express' });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
console.log("In the GET route?");
Comment.find(function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found
  }
})
});

router.delete('/comment', function(req, res, next) {
    console.log("in the DELETE route");
    Comment.deleteAll(function(err, result) {
        if (err) {
            console.log("Error in delete route");
        }
        else {
            console.log("Comments db has been deleted");
            res.send(result);
        }

    })
});

router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    res.sendStatus(200);
});

module.exports = router;
