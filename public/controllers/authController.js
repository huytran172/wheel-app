angular.module('WheelApp')
  .controller('authController', function ($scope, $http, $rootScope, $location) {
    $scope.user = {username: "", password: ""};
    $scope.error_message = '';
    $scope.colors = [];

    //$scope.login = function() {
    //  console.log('Hello world');
    //  // AJAX CALL BACK
    //  $http.post(
    //    // TODO: POST request to 'auth/login'
    //    // POST DATA TYPE EXAMPLE
    //    // JSON DATA
    //    // "{username: "abc", password: "123"}"
    //    '/auth/login',
    //    JSON.stringify($scope.user)
    //  ).then(
    //    // TODO: If authentication is valid, please respond with user info
    //    // Username, colors chosen history, points ... Nam's decision
    //    // Require data: id, username, color, state (success, fail)
    //    function success (response) {
    //      if (response.state === 'success') {
    //        $rootScope.authenticated = true;
    //        $rootScope.currentUser = response.username;
    //
    //        $location.path('/user');
    //      }
    //    },
    //    function error (response) {
    //      $scope.error_message = response;
    //    }
    //  );
    //}

    // MOCK LOGIN
    $scope.login = function () {
      // success
      $location.path('/user');
      $rootScope.currentUser = "Huy Tran";
      $rootScope.authenticated = true;
    }
  });