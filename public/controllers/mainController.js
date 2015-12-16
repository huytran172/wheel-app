var socket = io();

angular.module('WheelApp')
  .controller('mainController', function ($rootScope, $scope, $http, $location) {

    socket.on('time', function(data){
      console.log(data.time);
      $scope.theTime = data.time;
    });

    function getCurrentQuestion() {
      $http.get(
        '/api/question'
      ).success(function (response) {
        console.log(response);
        $scope.currentQuestion = response;
        // questionText
        // answerText
      });
    }
    function getFeed() {
      $http.get('/questions/feed').success(function (response) {
        $scope.feeds = response;
      });
    }

    getCurrentQuestion();

    socket.on('load', function(){
      console.log('Yo we got a new question over here');
      getCurrentQuestion();
    });
    // -----------------------------------


    // Get the feed
    getFeed();

    // -----------------------------------------------------------------

    // Submit answer
    $scope.userAnswer = "";
    $scope.message = "";
    $scope.submitAnswer = function () {
      if ($scope.currentQuestion.answerText.toLowerCase() == $scope.userAnswer.toLowerCase()) {
        $scope.message = "Answer is correct. You earn ten points";
        $scope.getMessageClass = function () {
          return 'alert-success';
        };
        // Post back to server

        $http.post(
          '/questions/question',
          {
            questionText: $scope.currentQuestion.questionText,
            answerText: $scope.currentQuestion.answerText,
            username: $rootScope.currentUser.username
          }
        ).success(function (response) {
          console.log(response);
          getCurrentQuestion();
          getFeed();
        });
      }
      else {
        $scope.message = "Wrong answer. Please try again";
        $scope.getMessageClass = function () {
          return 'alert-danger';
        }
      }
    };
  });