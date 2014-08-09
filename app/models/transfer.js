'use strict';

var Mongo = require('mongodb');

function Transfer(obj){
  this.amount = parseInt(obj.amount);
  this.fee = parseInt(obj.fee);
  this.date   = new Date(obj.date);
  this.toAccountId = Mongo.ObjectID(obj.toAccountId);
  this.fromAccountId = Mongo.ObjectID(obj.fromAccountId);
}

Object.defineProperty(Transfer, 'collection',{
  get: function(){
    return global.mongodb.collection('transfers');
  }
});

Transfer.save = function(obj, cb) {
  var transfer = new Transfer(obj);
  Transfer.collection.save(transfer, function(){
    cb(transfer);
  });
};

Transfer.findByAccountId = function(accountId, cb) {
  Transfer.collection.find({
    $or: [{ toAccountId: new Mongo.ObjectID(accountId)   },
          { fromAccountId: new Mongo.ObjectID(accountId) }]
  }).toArray(cb);
};

module.exports = Transfer;
