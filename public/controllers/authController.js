angular.module('WheelApp')
  .controller('authController', function ($scope, $http, $rootScope, $location) {
    $scope.user = {username: "", password: ""};
    $scope.error_message = '';

    function authenticate(url) {
      console.log(url + " " + $scope.user);
      $http.post(
        url,
        $scope.user
      ).success(function putDataInScope(response) {
        var data = response;
        console.log(data);
        if (data.state === "success") {
          $rootScope.authenticated = true;

          $rootScope.currentUser = response.user.username;
          $rootScope.currentPoint = response.user.points;

          $location.path('/');
        }
        else if (data.state === "failure") {
          $scope.error_message = data.message;
        }
        }
      )
    }
    $scope.login = function () {
      authenticate('/auth/login');
    };
    $scope.signup = function () {
      authenticate('/auth/signup');
    };
  });