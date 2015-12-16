angular.module('WheelApp')
  .controller('mainController', function ($rootScope, $scope, $http, $location) {
    function getCurrentQuestion() {
      $http.get(
        '/api/question'
      ).success(function (response) {
        console.log(response);
        $scope.currentQuestion = response;
      });
    }
    function getFeed() {
      $http.get('/questions/feed').success(function (response) {
        $scope.feeds = response;
      });
    }
    getCurrentQuestion();
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
    // ----------------------------------------------------------------
    var socket = io();
    // $('#counter').val();
    socket.on('time', function(data){
      console.log(data.time);
      $scope.time = data.time.val;
    })
  });
