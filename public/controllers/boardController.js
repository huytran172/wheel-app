angular.module('WheelApp')
  .controller('boardController', function ($http, $scope) {
    $http.get(
      'leaderboard/users'
    ).success(function (response) {
      $scope.users = response;
    });
  });
