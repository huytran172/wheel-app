angular.module('WheelApp')
  .controller('authController', function ($scope, $http, $rootScope, $location) {
    $scope.user = {username: '', password: ''};
    $scope.error_message = '';

    $scope.auth = function authenticate(url) {
      $http.post(
        url,
        $scope.user
      ).success(function (response) {
          var data = response;
          console.log(data);
          if (data.user !== null) {
            if (data.state == "success") {
              $rootScope.authenticated = true;
              $rootScope.currentUser = response.user;
              $rootScope.currentPoint = response.user.points;
              $location.path('/');
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
  });
