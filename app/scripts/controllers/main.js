'use strict';

angular.module('thumbtackMineApp')
  .controller('MainCtrl', function ($scope, boardHelp) {
    var checkMine = function(square) {
      if(square.value === 9) {
        //end game
        $scope.gamebanner = true;
      }
    };

    $scope.showValue = function(square) {
      if(!$scope.set) {
        $('.tile9').html('<i class="fa fa-certificate"></i>');
        $scope.set = true;
      }
      if(!$scope.cheatMode) {
        square.clicked = true;
        square.permClick = true;
        checkMine(square);
        if(square.value === 0) {
          // console.log(square);
          var row = square.row;
          var col = square.col;
          console.log(row);
          console.log(col);

          for(var i=row-1; i<row+2; i++) {
            for(var j=col-1; j<col+2; j++) {
              console.log(i, j);
          //     if($scope.board[i] && $scope.board[i][j]) {
          //       // $scope.showValue($scope.board[i][j]);
          //       console.log(i, j)
          //       // $scope.board[i][j].clicked = true;
          //       // $scope.board[i][j].permClick = true;
          //     }
            }
          }
        }
      }
    };

    $scope.finishGame = function(square) {
      // if()
    };

    $scope.toggleAll = function() {
      if(!$scope.set) {
        $('.tile9').html('<i class="fa fa-certificate"></i>');
        $scope.set = true;
      }
      if(!$scope.cheatMode) {
        $scope.cheatMode = !$scope.cheatMode;
        boardHelp.forEachSq($scope.board, function(row, col, board) {
          if(!board[row][col].clicked) {
            board[row][col].clicked = !board[row][col].clicked;
          }
        });
      } else {
        $scope.cheatMode = !$scope.cheatMode;
        boardHelp.forEachSq($scope.board, function(row, col, board) {
          if(!board[row][col].permClick) {
            board[row][col].clicked = !board[row][col].clicked;
          }
        });
      }
    };

    var init = function() {
      var mines = 10;
      var newBoard = boardHelp.createBoard(8);
      newBoard = boardHelp.randomMinePlace(mines, newBoard);
      newBoard = boardHelp.fillBoard(newBoard);
      $scope.set = false;
      $scope.board = newBoard;
      $scope.cheatMode = false;
      $scope.alreadyClicked = [];
    };

    init();
  });
