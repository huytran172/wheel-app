angular.module('WheelApp')
  .controller('userController', function ($location, $scope, $rootScope, $resource) {
    if ($rootScope.authenticated) {
      // Get all question answer correctly by that user
      var Question = $resource('/questions/:userId', {userId:'@id'});
      var questions = Question.get({userId:123}, function() {
        $scope.questionsList = questions;
      });
    }
    else {
      $location.url('/');
    }
  });
