angular.module('WheelApp')
  .controller('authController', function ($scope, $http, $rootScope, $location) {
    $scope.user = {username: '', password: ''};
    $scope.error_message = '';

    $scope.auth = function authenticate(url) {
      console.log(url + " " + $scope.user + " ABBBBBBBBBBBBBBBBBBBBBBBB");
      $http.post(
        url,
        $scope.user
      ).success(function (response) {
          var data = response;
          console.log(data);
          if (data.user !== null) {
            if (data.state == "success") {
              $rootScope.authenticated = true;
              console.log('bug');
              $rootScope.currentUser = response.user.username;
              $rootScope.currentPoint = response.user.points;
              $location.path('/user');
            }
          }
          else {
            $scope.error_message = data.message;
          }
        }
        )
        .error(function (error) {
          $scope.error_message = "This is weird";
        })
    }
    //$scope.login = function () {
    //  authenticate('/auth/login');
    //};
    //$scope.signup = function () {
    //  authenticate('/auth/signup');
    //};
  });