angular.module('WheelApp')
  .controller('mainController', function ($scope, $http, $location) {

    // Can you get the current question??
    $scope.currentQuestion = {
      question: "What is my name",
      answer: "huy",
      answeredBy: ""
    };
    // -----------------------------------

    // Can you get all questions with empty string answeredBy property
    $scope.listQuestion = [
      {
        question: "1+1",
        answer: "2",
        answeredBy: "Huy Tran"
      }
    ];
    // -----------------------------------------------------------------

    // Submit answer
    $scope.userAnswer = "";
    $scope.message = "";
    $scope.submitAnswer = function () {
      if ($scope.currentQuestion.answer.toLowerCase() == $scope.userAnswer.toLowerCase()) {
        $scope.message = "Answer is correct. You earn ten points";
        $scope.getMessageClass = function () {
          return 'alert-success';
        }
      }
      else {
        $scope.message = "Wrong answer. Please try again";
        $scope.getMessageClass = function () {
          return 'alert-danger';
        }
      }
    };
    // ----------------------------------------------------------------
  });
