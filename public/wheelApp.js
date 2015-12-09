angular.module('WheelApp', ['ngRoute', 'ngResource'])
  // Initialization and log out
  .run(function ($rootScope, $http) {
    // No user logged in
    $rootScope.authenticated = false;
    $rootScope.currentUser = "";
    // reset state of the app
    $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.currentUser= '';
    };
  })
  // Routing Configuration
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
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'aboutController'
    })
  });

