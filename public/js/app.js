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
    RouterFunction
  ])
  .factory("Candidate", [
    "$resource",
    FactoryFunction
  ])
  .controller("CandidateIndexController",[
    "Candidate",
    CandidateIndexCtrlFunction
  ])

  function FactoryFunction($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  function CandidateIndexCtrlFunction(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
    // this.candidate = Candidate.query();
    // this.newCandidate = new Candidate();
  }

  function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html",
      controller: "CandidateIndexController",
      controllerAS: "indexVM"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html"
    });
    $urlRouterProvider.otherwise("/");
  }



})();
