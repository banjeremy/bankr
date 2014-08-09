/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect       = require('chai').expect;
var Transaction  = require('../../app/models/transaction');
var dbConnect    = require('../../app/lib/mongodb');
var cp           = require('child_process');
var db           = 'bankr-test';
var Mongo        = require('mongodb');

describe('Transaction', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Transaction object', function(){
      var obj = {
        accountId: new Mongo.ObjectID().toString(),
        date: new Date(),
        type: 'Withdrawal',
        amount: '400.00',
        fee: '50.00'
      };

      var t = new Transaction(obj);
      expect(t).to.be.okay;
      expect(t).to.be.instanceof(Transaction);
      expect(t.accountId).to.be.instanceof(Mongo.ObjectID);
      expect(t.amount).to.equal(400.00);
      expect(t.fee).to.equal(50.00);
    });
  });

  describe('save', function(){
    it('should save a Transaction object', function(done){
      var obj = {
        accountId: new Mongo.ObjectID().toString(),
        date: new Date(),
        type: 'Withdrawal',
        amount: '400.00',
        fee: '50.00'
      };
      Transaction.save(obj, function(transaction) {
        expect(transaction).to.be.instanceof(Transaction);
        expect(transaction._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('findByAccountId', function(){
    it('should find transactions by accountId', function(done){
      var accountId = '53e5659ee1eb2778810b9d4a';
      Transaction.findByAccountId(accountId, function(err, transactions){
        expect(transactions).to.not.be.a('null');
        expect(transactions).to.have.length.gt(0);
        done();
      });
    });
  });
});
