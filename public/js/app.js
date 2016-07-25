"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])

  function Router ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true)
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/js/welcome.html"
      })
      .state("index", {
        url: "/candidates",
        templateUrl: "/assets/js/candidates/index.html",
        controller: "indexCtrl",
        controllerAs: "indexVM"
      })
      .state("show", {
        url: "/candidates/:name",
        templateUrl: "/assets/js/candidates/show.html",
        controller: "showCtrl",
        controllerAs: "showVM"
      })

    $urlRouterProvider.otherwise("/")
  }

})();
