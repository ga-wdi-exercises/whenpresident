"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("canIndexController", [
    "Candidate",
    canIndexCtrl
  ]);

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidate-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "canIndexController",
      controllerAs: "indexVM"
    })
  };

  function Candidate($resource){
    var Candidate = $resource("api/candidates/:name", {}, {
      update: {method: "PUT"}
    })
      Candidate.all = Candidate.query();
      return Candidate;
  };

  function canIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all
  };

})();
