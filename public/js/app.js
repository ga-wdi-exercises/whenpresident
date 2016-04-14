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
  .factory("CandidateFactory", [
    "$resource",
    CandidateFactory
  ])
  .controller("CandidateIndexController", [
    "CandidateFactory",
    CandidateIndexController
  ])

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/html/app-welcome.html"
      })
      .state("index", {
        url: "/candidates",
        templateUrl: "/assets/html/candidates-index.html",
        controller: "CandidateIndexController",
        controllerAs: "indexVM"
      })
      $urlRouterProvider.otherwise("/")
  }

  function CandidateFactory($resource){
    var CandidateFactory = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    CandidateFactory.all = CandidateFactory.query();
    return CandidateFactory;
  }

  function CandidateIndexController(CandidateFactory){
    var vm = this;
    vm.candidates = CandidateFactory.all;
  }

})();
