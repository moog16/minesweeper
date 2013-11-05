'use strict';

angular.module('thumbtackMineApp')
  .controller('MainCtrl', function ($scope) {
    var createBoard = function(size) {
      var board = new Array(size);
      for(var i=0; i<size; i++) {
        board[i] = new Array(size);
      }

      return board;
    };

    var randomMinePlace = function(amount, board) {
      var count = 0;
      var maxLength = board.length;
      while(count < amount) {
        var col = Math.floor(maxLength*Math.random());
        var row = Math.floor(maxLength*Math.random());

        if(!board[row][col]) {
          board[row][col] = 9;  // 9 is a mine
          count++;
        }
      }
      return board;
    };

    var fillNumbers = function(board, row, col) {
      var result = 0;
      for(var i=row-1; i<row+2; i++) {
        for(var j=col-1; j<col+2; j++) {
          if(board[i] && board[i][j] === 9) {
            result++;
          }
        }
      }
      return result
    };

    var fillBoard = function(board) {

      for(var i=0; i<board.length; i++) {
        for(var j=0; j<board[i].length; j++) {
          if(board[i][j] === undefined) {
            board[i][j] = fillNumbers(board, i, j);
          }
        }
      }
      return board;
    };

    var mines = 10;
    var newBoard = createBoard(8);
    newBoard = randomMinePlace(mines, newBoard);
    newBoard = fillBoard(newBoard);
    $scope.board = newBoard;
  });
