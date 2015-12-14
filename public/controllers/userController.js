angular.module('WheelApp')
  .controller('userController', function ($location, $scope, $rootScope, $resource) {
    if ($rootScope.authenticated) {
      // Get all question answered correctly by that user
      var Question = $resource('/questions/:userId', {userId:'@id'});
      var questions = Question.query({userId:123}, function() {
        $scope.questionsList = questions;
      });
    }
    else {
      $location.url('/');
    }
  });
