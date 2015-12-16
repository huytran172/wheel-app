angular.module('WheelApp')
  .controller('mainController', function ($rootScope, $scope, $http, FeedListActiveClass, FeedListCount) {
    function getCurrentQuestion() {
      $http.get(
        '/questions/question'
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
      if ($scope.currentQuestion != null && $scope.currentQuestion.answerText.toLowerCase() == $scope.userAnswer.toLowerCase()) {
        $scope.getMessageClass = function () {
          return 'alert-success';
        };
        // Post back to server

        $http.put(
          '/questions/question',
          {
            _id: $scope.currentQuestion._id,
            username: $rootScope.currentUser.username
          }
        ).success(function (response) {
          $scope.message = response;
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

    $scope.selectedPage = 1;
    $scope.pageSize = FeedListCount;
    $scope.selectPage = function (newPage) {
      $scope.selectedPage = newPage;
    };
    $scope.getPageClass = function (page) {
      return $scope.selectedPage == page ? FeedListActiveClass : "";
    }
  });
