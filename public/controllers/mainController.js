var socket = io();

angular.module('WheelApp')
  .constant('FeedPageSize', 3)
  .constant('FeedPageActive', 'btn-primary')
  .controller('mainController', function (FeedPageSize, FeedPageActive, $rootScope, $scope, $http, $location, $timeout) {

  socket.on('time', function(data){
    // console.log(data.time);
    $scope.theTime = data.time;
    $scope.$apply();
  });

  function getCurrentQuestion() {
    $http.get(
      '/api/question'
      ).success(function (response) {
        console.log(response);
        $scope.currentQuestion = response;
        $scope.$apply();
      });
    }

    function getFeed() {
      $http.get('/questions/feed').success(function (response) {
        $scope.feeds = response;
        $scope.$apply();
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

    function remove_tags(html) {
     var tmp = document.createElement("DIV");
     tmp.innerHTML = html; 
     return tmp.textContent||tmp.innerText; 
   };

   $scope.submitAnswer = function () {
    if (remove_tags($scope.currentQuestion.answer.toLowerCase()) == $scope.userAnswer.toLowerCase()) {
      $scope.message = "Answer is correct. You earn ten points";
      $scope.getMessageClass = function () {
        return 'alert-success';
      };
        // Post back to server

        $http.post(
          '/questions/question',
          {
            questionText: $scope.currentQuestion.question,
            answerText: $scope.currentQuestion.answer,
            username: $rootScope.currentUser.username
          }
        ).success(function (response) {
          console.log(response);
          getCurrentQuestion();
          getFeed();
        });
      }
      else {
        $timeout(function () { $scope.message = ""; }, 3000);
        $scope.message = "Wrong answer. Please try again";
        $scope.getMessageClass = function () {
          return 'alert-danger';
        }
      }
    };

    $scope.selectedPage = 1;
    $scope.pageSize = FeedPageSize;
    $scope.selectPage = function (newPage) {
      $scope.selectedPage = newPage;
    }
    $scope.getPageClass = function (page) {
        return $scope.selectedPage == page ? FeedPageActive : "";
    }
  });
