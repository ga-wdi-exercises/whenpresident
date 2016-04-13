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
    "$urlRouterProvider"
    Router
  ])
  .factory("Candidate", [
    candidIndexController
  ])

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "assets/html/candidates-index.html",
      controller: "candidIndexController";
      controllerAs: "indexVM"
    });
    $urlRouterProvider.otherwise("/")
  }

  function Candidate($resource){
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
