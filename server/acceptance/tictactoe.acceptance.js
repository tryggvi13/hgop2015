'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

const getApiUri = (command) => {
  if (command.comm === "CreateGame") return "/api/createGame";
  else if (command.comm === "JoinGame") return "/api/joinGame";
  else if (command.comm === "MakeMove") return "/api/placeMove";
};

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

function user(userName){
  const api = {
    createsGame: function(gameId){
      return { id : "1234",
        gameId : gameId,
        comm: "CreateGame",
        userName: userName,
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      };
    }
  };
  return api;
};

function given(cmdName){
  var cmd={
    name:cmdName,
    destination:undefined
  };
  const expectations = [];
  var givenApi = {
    sendTo: function(dest){
      cmd.destination = dest;
      return givenApi;
    },
    expect: function(eventName){
      expectations.event(eventName);
      return givenApi;
    },
    withGameId: function(gameId){
      expectations.gameID = gameId;
      return givenApi;
    },
    when: function(done){
      const req = request(acceptanceUrl);
      req
        .post('/api/createGame')
        .type('json')
        .send(cmd.name)
        .end(function (err, res) {
          if (err) return done(err);
          req
            .get('/api/gameHistory/999')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              res.body.should.be.instanceof(Array);
              should(res.body[res.body.length - 1]).have.property('event', expectations.event);
              should(res.body[res.body.length - 1]).have.property('gameId', expectations.gameId);
              done()
            });
        });
    }
  };
  return givenApi;
}


describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id: "1234",
      gameId: "100000",
      comm: "CreateGame",
      userName: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/100000')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "100000",
                "event": "GameCreated",
                "userName": "Gulli",
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });


   it('Should execute fluid API test', function (done) {
     given(user("YourUser").createsGame("TheFirstGame"))
     .expect("GameCreated").withName("TheFirstGame").isOk(done);
   });

});
