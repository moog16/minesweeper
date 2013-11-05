'use strict';

angular.module('thumbtackMineApp')
  .controller('MainCtrl', function ($scope) {
    var createBoard = function() {
      var board = new Array(8);
      for(var i=0; i<8; i++) {
        board[i] = new Array(8);
      }

      return board;
    }
  });
