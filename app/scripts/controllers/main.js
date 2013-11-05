'use strict';

angular.module('thumbtackMineApp')
  .controller('MainCtrl', function ($scope, createBoard) {
    var checkMine = function(square) {
      if(square.value === 9) {
        //end game
        $scope.gamebanner = true;
      }
    };

    $scope.showValue = function(square) {
      square.clicked = true;
      checkMine(square);
    };

    $scope.toggleAll = function() {
      var alreadyClicked = {};
      if(!$scope.cheatMode) {

        createBoard.forEachSq($scope.board, function(row, col, board) {
          if(board[row][col].clicked) {
            var key = JSON.stringify([row,col]);
            alreadyClicked[key] = true;
          } else {
            board[row][col].clicked = !board[row][col].clicked;
          }
        });
        console.log(alreadyClicked)
      }
    };

    var init = function() {
      var mines = 10;
      var newBoard = createBoard.createBoard(8);
      newBoard = createBoard.randomMinePlace(mines, newBoard);
      newBoard = createBoard.fillBoard(newBoard);
      $scope.board = newBoard;
      $scope.cheatMode = false;
    };

    init();
  });
