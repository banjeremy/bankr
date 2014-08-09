'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

var Account = function(obj) {
  this.name = obj.name;
  this.photo = obj.photo;
  this.accountType = obj.accountType;
  this.color = obj.color;
  this.dateCreated = new Date(obj.dateCreated);
  this.pin = parseInt(obj.pin);
  this.initDeposit = parseFloat(obj.initDeposit);
  this.balance = parseFloat(obj.balance);
};

Object.defineProperty(Account, 'collection', {
  get: function(){
    return global.mongodb.collection('accounts');
  }
});

Account.prototype.save = function(cb) {
  var account = this;
  Account.collection.save(account, function(){
    cb(account);
  });
};

Account.findById = function(id, cb) {
  Account.collection.findOne({
    _id: Mongo.ObjectID(id)
  }, function(err, result) {
    cb(changePrototype(result));
  });
};

// Private function
function changePrototype(obj){
  var account = _.create(Account.prototype, obj);
  return account;
}

module.exports = Account;
