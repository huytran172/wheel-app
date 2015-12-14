angular.module('WheelApp')
  .controller('authController', function ($scope, $http, $rootScope, $location) {
    $scope.user = {username: "", password: ""};
    $scope.error_message = '';

    function authenticate(url) {
      $http.post(
        url,
        JSON.stringify($scope.user)
      ).success(function putDataInScope(response) {
          var data = response;
          if (data.state === "success") {
            $rootScope.authenticated = true;

            $rootScope.currentUser = response.username;
            $rootScope.currentPoint = response.point;

            $location.path('/');
          }
          else if (data.state === "error") {
            $scope.error_message = data.error_message;
          }
        }
      )
    }

    $scope.login = function () {
      authenticate('/auth/login')
    };
    $scope.signup = function () {
      authenticate('/auth/signup')
    };

    // MOCK LOGIN
    //$scope.login = function () {
    //  // success
    //  $location.path('/');
    //  $rootScope.currentUser = "Huy Tran";
    //  $rootScope.authenticated = true;
    //  $rootScope.currentPoint = 10;

      // fail
      // $scope.error_message = "Invalid user or password";
  });