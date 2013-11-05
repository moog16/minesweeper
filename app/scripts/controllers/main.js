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
      if(!$scope.cheatMode) {
        square.clicked = true;
        square.permClick = true;
        checkMine(square);
      }
    };

    $scope.toggleAll = function() {
      if(!$scope.cheatMode) {
        $scope.cheatMode = true;
        createBoard.forEachSq($scope.board, function(row, col, board) {
          if(!board[row][col].clicked) {
            board[row][col].clicked = !board[row][col].clicked;
          }
        });
      } else {
        $scope.cheatMode = false;
        createBoard.forEachSq($scope.board, function(row, col, board) {
          if(!board[row][col].permClick) {
            board[row][col].clicked = !board[row][col].clicked;
          }
        });
      }
    };

    var init = function() {
      var mines = 10;
      var newBoard = createBoard.createBoard(8);
      newBoard = createBoard.randomMinePlace(mines, newBoard);
      newBoard = createBoard.fillBoard(newBoard);
      $scope.board = newBoard;
      $scope.cheatMode = false;
      $scope.alreadyClicked = [];

      $('.tile9').html('<i class="fa fa-certificate"></i>');
    };

    init();
  });
