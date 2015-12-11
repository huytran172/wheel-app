angular.module('WheelApp')
  .controller('userController', function ($scope, $rootScope, $resource) {
    $scope.colors = [];
    if ($rootScope.authenticated) {
      // GET colors associated with id
      var ListColors = $resource('/colors/:userID', {userID:'@id'});
      ListColors.get({userId: $rootScope.currentUser.userID}, function(data) {
        $scope.colors = data;
      });
    }
  });
