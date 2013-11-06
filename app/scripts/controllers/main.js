'use strict';

angular.module('thumbtackMineApp')
  .controller('MainCtrl', function ($scope, $timeout, boardHelp) {
    var checkMine = function(square) {
      if(square.value === 9) {
        notification('gamelost');
      }
    };

    var notification = function(state) {
      $scope.gamelost = false;
      $scope.gamewin = false;
      $scope.restart = false;
      $scope.gameSaveNotification = false;
      if(!$scope[state]) {
        $scope[state] = true;
      }
      if(state === 'restart' ||
         state === 'gameSaveNotification') {
        $timeout(function() {
          $scope[state] = false;
        },3000);
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
          var row = square.row;
          var col = square.col;

          for(var i=row-1; i<row+2; i++) {
            for(var j=col-1; j<col+2; j++) {
              if($scope.board[i] && $scope.board[i][j]) {
                // $scope.showValue($scope.board[i][j]);
                $scope.board[i][j].clicked = true;
                $scope.board[i][j].permClick = true;
              }
            }
          }
        }
      }
      $scope.saveGame();
    };

    $scope.finishGame = function(square) {
      boardHelp.forEachSq($scope.board, function(row, col, board) {
        if(board[row][col].value < 9 && !board[row][col].permClick) {
          notification('gamelost');
        }
      });
      if(!$scope.gamelost) {
        notification('gamewin');
      }
      $('#myModal').modal();
    };

    $scope.newGame = function() {
      resetBoard($scope.size, $scope.mines);
      notification('restart');
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

    $scope.increaseMines = function() {
      if($scope.mines < $scope.size * $scope.size) {
        $scope.mines++;
        $scope.newGame();
      }
    };

    $scope.decreaseMines = function() {
      if($scope.mines > 0) {
        $scope.mines--;
        $scope.newGame();
      }
    };

    $scope.increaseBoard = function() {
      if($scope.size < $scope.max) {
        $scope.size++;
        $scope.newGame();
      }
    };

    $scope.decreaseBoard = function() {
      if($scope.size > 0) {
        $scope.size--;
        $scope.newGame();
      }
    };

    $scope.saveGame = function() {
      var savedMineSweeperGame = {
        board: $scope.board,
        gamelost: $scope.gamelost,
        gamewin: $scope.gamewin,
        cheatMode: $scope.cheatMode,
        alreadyClicked: $scope.alreadyClicked
      };
      savedMineSweeperGame = JSON.stringify(savedMineSweeperGame);
      localStorage.savedMineSweeperGame = savedMineSweeperGame;

      notification('gameSaveNotification');
    };


    var init = function() {
      $scope.mines = 10;
      $scope.size = 8;
      $scope.max = 15;

      if(!localStorage.savedMineSweeperGame) {
        resetBoard($scope.size, $scope.mines);
      } else {
        var saved = JSON.parse(localStorage.savedMineSweeperGame);
        $scope.board = saved.board;
        $scope.set   = false;
        $scope.gamelost = saved.gamewin;
        $scope.gamewin = saved.gamelost;
        $scope.cheatMode = saved.cheatMode;
        $scope.alreadyClicked = saved.alreadyClicked;
      }
    };


    var resetBoard = function(size, mines) {
      var newBoard = boardHelp.createBoard(size);
      newBoard = boardHelp.randomMinePlace(mines, newBoard);
      newBoard = boardHelp.fillBoard(newBoard);
      $scope.gamelost = false;
      $scope.gamewin = false;
      $scope.set = false;
      $scope.board = newBoard;
      $scope.cheatMode = false;
      $scope.alreadyClicked = [];
    };

    init();
  });
