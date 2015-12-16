angular.module('WheelApp')
  .controller('userController', function ($location, $scope, $rootScope, $http) {
    if ($rootScope.authenticated) {
      $http.get('/questions/question/' + $rootScope.currentUser._id).success(function (response) {
        $scope.questionsList = response;
        $scope.mostRecentWin = 0;
        response.forEach(function (item) {
          if (item.answerAt > $scope.mostRecentWin) {
            $scope.mostRecentWin = item.answerAt;
          }
        });
      });
      $http.post('/questions/userRecord', {_id: $rootScope.currentUser._id}).success(function (response) {
        console.log(response);
        $scope.points = response.points;
      })

    }
    else {
      $location.url('/');
    }
  });
