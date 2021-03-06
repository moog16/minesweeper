angular.module('thumbtackMineApp')
  .factory('boardHelp', function () {

    var fillNumbers = function(board, row, col) {
      var result = 0;
      for(var i=row-1; i<row+2; i++) {
        for(var j=col-1; j<col+2; j++) {
          if(board[i] && board[i][j] && board[i][j].value === 9) {
            result++;
          }
        }
      }
      return result;
    };


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
          board[row][col] = {
            value: 9,  // 9 is a mine
            clicked: false,
            permClick: false,
            row: row,
            col: col
          };
          count++;
        }
      }
      return board;
    };

  


    var fillBoard = function(board) {
      this.forEachSq(board, function(row, col) {
        if(board[row][col] === undefined) {
          board[row][col] = {
            value: fillNumbers(board, row, col),
            clicked: false,
            permClick: false,
            row: row,
            col: col
          };
        }
      });
      return board;
    };

    var forEachSq = function(board, method) {
      for(var row=0; row<board.length; row++) {
        for(var col=0; col<board[row].length; col++) {
          method(row, col, board);
        }
      }
    };

    return {
      forEachSq: forEachSq,
      fillBoard: fillBoard,
      randomMinePlace: randomMinePlace,
      createBoard: createBoard
    };
  });