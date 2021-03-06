
// Declare application level module which depends on additional filters and services (most of them are custom)
var appointsApp = angular.module('appointsApp', [
  'appoints.infrastructure',
  'appoints.authevents',
  'appoints.localization'
]);

// Configure application $route, $location and $http services.
appointsApp.config([
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {

    // List of routes of the application
    $routeProvider
      // Pages
      .when('/', {templateUrl : '/partials/home.html'})
      .when('/about', {templateUrl : '/partials/about.html'})

      // Appointments
      .when('/appointments', { auth: true, templateUrl : '/partials/appointments/list.html' })

      // Authentication/signup
      .when('/register', {templateUrl : '/partials/account/register.html'})
      .when('/login', {templateUrl : '/partials/account/login.html'})
      .when('/confirmsuccess', {templateUrl : '/partials/account/confirmsuccess.html'})

      // 404
      .when('/404', {templateUrl : '/partials/errors/404.html'})
      // Catch all
      .otherwise({redirectTo : '/404'});

    // Without serve side support html5 must be disabled.
    $locationProvider.html5Mode(true);
  }
]);