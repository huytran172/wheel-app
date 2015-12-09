angular.module('WheelApp')
  .controller('authController', function ($scope, $http, $rootScope, $location) {
    $scope.user = {username: "", password: ""};
    $scope.error_message = '';

    //function authenticate(url) {
    //  $http.post(
    //    url,
    //    JSON.stringify($scope.user)
    //  ).success(function putDataInScope(response) {
    //      var data = JSON.parse(response);
    //      if (data.state === "success") {
    //        $rootScope.authenticated = true;
    //        $rootScope.currentUser = response.username;
    //
    //        $location.path('/user');
    //      }
    //      else if (data.state === "error") {
    //        $scope.error_message = data.error_message;
    //      }
    //    }
    //  )
    //}

    //$scope.login = function () {
    //  authenticate('/auth/login')
    //};
    //$scope.signup = function () {
    //  authenticate('/auth/signup')
    //};

    // MOCK LOGIN
    $scope.login = function () {
      // success
      //$location.path('/user');
      //$rootScope.currentUser = "Huy Tran";
      //$rootScope.authenticated = true;

      // fail
      $scope.error_message = "Invalid user or password";
    }
  });