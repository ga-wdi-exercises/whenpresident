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
    Router
  ])
  .factory("Candidate", [
    "$resource",
    CandidateFactory
  ])
  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ]);

  function Router($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html" //why is this .html instead of .hbs?
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candIndexCtrl",
      controllerAs: "indexVM"
    });
  }

  function CandidateFactory($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  function candIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

})();
