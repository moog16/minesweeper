'use strict';

angular.module('thumbtackMineApp')
  .controller('MainCtrl', function ($scope) {

    $scope.cheatMode = false;

    var createBoard = function(size) {
      var board = new Array(size);
      for(var i=0; i<size; i++) {
        board[i] = new Array(size);
      }

      return board;
    };

    var forEachSq = function(board, method) {
      for(var row=0; row<board.length; row++) {
        for(var col=0; col<board[row].length; col++) {
          method(row, col);
        }
      }
    };

    var randomMinePlace = function(amount, board) {
      var count = 0;
      var maxLength = board.length;
      while(count < amount) {
        var col = Math.floor(maxLength*Math.random());
        var row = Math.floor(maxLength*Math.random());

        if(!board[row][col]) {
          board[row][col] = {
            value: 9,  // 9 is a mine
            clicked: false
          };
          count++;
        }
      }
      return board;
    };

    var fillNumbers = function(board, row, col) {
      var result = 0;
      for(var i=row-1; i<row+2; i++) {
        for(var j=col-1; j<col+2; j++) {
          if(board[i] && board[i][j] && board[i][j].value === 9) {
            result++;
          }
        }
      }
      return result
    };

    var fillBoard = function(board) {
      forEachSq(board, function(row, col) {
        if(board[row][col] === undefined) {
          board[row][col] = {
            value: fillNumbers(board, row, col),
            clicked: false
          };
        }
      });
      return board;
    };

    var checkMine = function(square) {
      if(square.value === 9) {
        //end game
        $scope.gamebanner = true;
      }
    };

    var mines = 10;
    var newBoard = createBoard(8);
    newBoard = randomMinePlace(mines, newBoard);
    newBoard = fillBoard(newBoard);
    $scope.board = newBoard;

    $scope.showValue = function(square) {
      square.clicked = true;
      checkMine(square);
    };



    // $scope.toggleAll = function() {
    //   var alreadyClicked = {};
    //   for(var i=0; i<board.length; i++) {
    //     for(var j=0; j<board[i].length; j++) {
    //       if(board[i][j].clicked) {
    //         var key = JSON.stringify([i,j]);
    //         alreadyClicked[key] = 

    //       } else {
    //         board[i][j].clicked = !board[i][j].clicked;
    //       }
    //     }
    //   }
    // };
  });
