'use strict';

var Mongo = require('mongodb');

var Transaction = function(obj) {
  this.accountId = Mongo.ObjectID(obj.accountId);
  this.date = new Date(obj.date);
  this.type = obj.type;
  this.amount = parseInt(obj.amount);
  this.fee = parseInt(obj.fee);
};

Object.defineProperty(Transaction, 'collection', {
  get: function(){
    return global.mongodb.collection('transactions');
  }
});

Transaction.save = function(obj, cb) {
  var transaction = new Transaction(obj);

  Transaction.collection.save(transaction, function(){
    cb(transaction);
  });
};

Transaction.findByAccountId = function(accountId, cb) {
  Transaction.collection.find({
      accountId: Mongo.ObjectID(accountId)
    }).toArray(cb);
};

module.exports = Transaction;
