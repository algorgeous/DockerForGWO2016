
//var shoeProvider = new ShoeProvider('admin:kgC2HDivyoup@172.99.73.242', 27017);

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = process.env.MONGO_URL;

// Read init data from data file mongoinit.txt
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('mongoinit.txt')
});

lineReader.on('line', function (line) {
  MongoClient.connect(url, function(err, db) {
    db.collection('shoes').insertOne(line);
    console.log('Inserted into DB:', line);
    db.close();
  });
});


var insertDocument = function(db, callback) {
   db.collection('shoes').insertOne( {
      "title" : "Sandals",
      "brand" : "Keen",
      "size" : 9,
      "width" :"R",
      "color" : "Gray",
      "qty" : 1
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the shoes collection.");
    callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
