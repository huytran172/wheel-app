angular.module('WheelApp', ['ngRoute', 'ngResource'])
  // Initialization and log out
  .run(function ($rootScope, $http, $location) {
    // No user logged in
    $rootScope.authenticated = false;
    $rootScope.currentUser = "";
    // reset state of the app
    $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.currentUser= '';

      $location.path('/');
    };
    $rootScope.redirectToUserPage = function () {
      if ($rootScope.authenticated) {
        $location.path('/user');
      }
    }
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
    .when('/user', {
      templateUrl: 'views/user.html',
      controller: 'userController'
    })
  });

