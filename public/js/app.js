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
  ]);

  function Router ($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl:"/assets/html/app-welcome.html",
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "assets/html/candidates-index.html",
      controller: "CandidatesIndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "assets/html/candidates-show.html",
      controller: "CandidateShowController",
      controllerAs: "vm"
    });
    $urlRouterProvider.otherwise("/");
  }

})();
