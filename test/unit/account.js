/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var Account   = require('../../app/models/account');
var dbConnect = require('../../app/lib/mongodb');
var cp        = require('child_process');
var db        = 'bankr-test';
var Mongo     = require('mongodb');

describe('Account', function(){
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
    it('should create a new Account object', function(){
      var obj = {
        name: 'Jeremy Jones',
        photo: 'img.jpg',
        accountType: 'Checking',
        color: 'white',
        dateCreated: '2014-8-9',
        pin: '1234',
        initDeposit: '100.00',
        balance: '500.00'
      };

      var a = new Account(obj);

      expect(a).to.be.instanceof(Account);
      expect(a).to.be.okay;
      expect(a.name).to.equal('Jeremy Jones');
      expect(a.photo).to.equal('img.jpg');
      expect(a.accountType).to.equal('Checking');
      expect(a.color).to.equal('white');
      expect(a.dateCreated).to.be.instanceof(Date);
      expect(a.pin).to.equal(1234);
      expect(a.initDeposit).to.equal(100.00);
      expect(a.balance).to.equal(500);
    });
  });

  describe('#save', function(){
    it('should save an account to the database', function(done) {
      var obj = {
        name: 'Jeremy Jones',
        photo: 'img.jpg',
        accountType: 'Checking',
        color: 'white',
        dateCreated: '2014-8-9',
        pin: '1234',
        initDeposit: '100.00',
        balance: '500.00'
      };

      var a = new Account(obj);
      a.save(function(account){
        expect(account).to.be.instanceof(Account);
        expect(account._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an account by account id', function(done){
      var id = '53e5659ee1eb2778810b9d4a';

      Account.findById(id, function(result) {
        expect(result).to.not.be.a('null');
        expect(result).to.be.instanceof(Account);
        done();
      });
    });
  });

  describe('#validatePin', function(){
    it('should validate the pin number', function(done){
      var id = '53e5659ee1eb2778810b9d4a';
      var pin = '9505';

      var a = Account.findById(id, function(a){
          expect(a.pin).to.equal(pin);
          expect(a.validatePin(pin)).to.be.true;
          done();
      });
    });
  });
});
