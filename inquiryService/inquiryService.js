var restify = require('restify');
var request = require('request');
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server(process.env.DB_IP, process.env.DB_PORT, {
  auto_reconnect: true
});
var db = new Db('kickinator', server);

var onErr = function(err, callback) {
  db.close();
  callback(err);
};

var findShoes = function(db, callback) {
  db.open(function(err, db) {
    if (!err) {
      var cursor = db.collection('shoes').find();
      cursor.toArray(function(err, data) {
        callback(err, data);
      });
    } else {
        onErr(err, callback);
      };
    });
};

var findShoeById = function(db, shoeId, callback) {
  db.open(function(err, db) {
    if (!err) {
      var o_id = new mongo.ObjectID(shoeId);
      var cursor = db.collection('shoes').find({"_id":o_id});
      cursor.toArray(function(err, data) {
        callback(err, data);
      });
    } else {
        onErr(err, callback);
      };
    });
};

function listShoes(req, res, next) {
    findGuests(db, function(err, data) {
      if (!err) {
        res.send(data);
      } else {
        res.send(err);
      }
      next();
      db.close();
    });
  };

function getShoeById(req, res, next) {
    findGuestById(db, req.params.id, function(err, data) {
      if (!err) {
        res.send(data);
      } else {
        res.send(err);
      }
      next();
      db.close();
  });
};

function getVersion(req, res, next) {
  res.send("1.0.0");
}

var server = restify.createServer({
  name: 'inquiryService',
});

server.use(restify.bodyParser());
server.get('/version', getVersion);
server.get('/shoes', listShoes);
server.get('/shoe/:id', getShoeById);
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
