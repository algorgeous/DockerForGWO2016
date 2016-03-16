var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ShoeProvider = function(host, port) {
  this.db= new Db('admin', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


ShoeProvider.prototype.getCollection= function(callback) {
  this.db.collection('shoes', function(error, Shoe_collection) {
    if( error ) callback(error);
    else callback(null, Shoe_collection);
  });
};

//find all Shoes
ShoeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, Shoe_collection) {
      if( error ) callback(error)
      else {
        Shoe_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new Shoe
ShoeProvider.prototype.save = function(Shoes, callback) {
    this.getCollection(function(error, Shoe_collection) {
      if( error ) callback(error)
      else {
        if( typeof(Shoes.length)=="undefined")
          Shoes = [Shoes];

        for( var i =0;i< Shoes.length;i++ ) {
          Shoe = Shoes[i];
          Shoe.created_at = new Date();
        }

        Shoe_collection.insert(Shoes, function() {
          callback(null, Shoes);
        });
      }
    });
};

exports.ShoeProvider = ShoeProvider;
