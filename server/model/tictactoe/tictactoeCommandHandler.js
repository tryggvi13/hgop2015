'use strict';
var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']],
    totalMoves: 0,
    currentSide : "X"
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
      if(event.side === "X") gameState.currentSide= "O";
      else gameState.currentSide= "X";
      gameState.totalMoves += 1;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });


  const HasWon = function(cmd){
    let sum = 0;
    //Vertical win
    for(let i = 0; i < 3; ++i)
    {
      if(gameState.board[cmd.x][i] === cmd.side)
        sum++;
    }
    if(sum === 2)
      return true;

    sum = 0;
    //Horizontal win
    for(let i = 0; i < 3; ++i){
      if(gameState.board[i].[cmd.y] === cmd.side)
        sum++;
    }
    if(sum === 2)
      return true;

    sum = 0;
    //Diagonal win
    for(let i = 0; i < 3; ++i) {
      if(gameState.board[i][i] === cmd.side)
        sum++;
    }
    if (sum === 2)
      return true;

    sum = 0;

    for (let x = 2, y = 0; x > -1 && y < 3; --x, ++y) {
      if (gameState.board[x][y] === cmd.side)
        sum++;
    }
  };
  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          user: cmd.user,
          timeStamp: cmd.timeStamp,
          name: cmd.name

        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            user: cmd.user,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          user: cmd.user,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          user: cmd.user,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }
      return [{
        id: cmd.id,
        event: "MoveMade",
        user: cmd.user,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
