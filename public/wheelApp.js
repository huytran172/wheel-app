angular.module('WheelApp', ['ngRoute', 'ngResource'])
  .config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'authController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'authController'
    });
});
