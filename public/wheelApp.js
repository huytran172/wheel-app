angular.module('WheelApp', ['ngRoute', 'ngResource', 'ui.router'])
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
  .config([function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'authController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'authController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'aboutController'
    })
  }]);

