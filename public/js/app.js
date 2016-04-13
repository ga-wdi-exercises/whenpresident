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
  .factory("Candidatefactory", [
    "$resource",
    Candidatefactory
  ])
  .controller("candIndexCtrl", [
    "Candidatefactory",
    candIndexCtrl
  ]);

  function Router ($stateProvider, $locationProvider){
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
  }

  function Candidatefactory($resource){
    var Candidate = $resource("/api/candidates/:name", {},{
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
