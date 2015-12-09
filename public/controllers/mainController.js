/**
 * mainController.js
 * GET request to /colors
 * Expected returning data: {color1, color2, ...}
 */
angular.module('WheelApp')
  .controller('mainController', function ($scope, $http) {
    $scope.listColors = ["red", "blue", "yellow"];
    //$http({
    //  method: 'GET',
    //  url: '/colors'
    //}).then(function successCallback(response) {
    //  $scope.listColors = response;
    //}, function errorCallback() {
    //  console.log ('some errors happened');
    //});
  });
