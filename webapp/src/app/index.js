'use strict';
//'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 
angular.module('webapp', ['chart.js','ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
