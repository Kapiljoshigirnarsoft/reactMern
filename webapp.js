var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;


var app = express();
var db;

app.use(express.static('static'));

// var bugData = [
//   {id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
//   {id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
// ];

app.get('/api/bugs', function(req, res) {
  console.log("Query string", req.query);
  var filter = {};
  if (req.query.priority)
    filter.priority = req.query.priority;
  if (req.query.status)
    filter.status = req.query.status;

  db.collection("bugs").find(filter).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());
app.post('/api/bugs/', function(req, res) {
  console.log("Req body:", req.body);
  var newBug = req.body;
  // newBug.id = bugData.length + 1;
  // bugData.push(newBug);
  // res.json(newBug);
   db.collection("bugs").insertOne(newBug, function(err, result) {
    var newId = result.insertedId;
    db.collection("bugs").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

// var server = app.listen(3009, function() {
//   var port = server.address().port;
//   console.log("Started server at port", port);
// });

MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection) {
  db = dbConnection;
  console.log(err);
  var server = app.listen(3009, function() {
   var port = server.address().port;
   console.log("Started server at port", port);
  });
});
