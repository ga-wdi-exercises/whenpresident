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
  .factory("Candidate", [
    "$resource",
    candidateFactoryFunction
  ])
  .controller("candidateIndexCtrl", [
    "Candidate",
    candidateIndexCtrl
  ]);

  function Router ($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html"
    })
    .state("index", {
      url: "/index",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candidateIndexCtrl",
      controllerAs: "indexVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function candidateFactoryFunction($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  function candidateIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }


})();
