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
    "$urlRouterProvider".
    Router
  ])
  .factory("CandidateFactory", [
    "$resource",
    CandidateFactory
  ])
  .controller("candIndexCtrl", [
    "CandidateFactory",
    candIndexCtrl
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candIndexCtrl",
      controllerAs: "indexVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function CandidateFactory($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  } // candidate factory

  function candIndexCtrl(CandidateFactory){
    var vm = this;
    vm.candidates = CandidateFactory.all;
  }

})();
