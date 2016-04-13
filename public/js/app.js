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
  ]);
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ]);

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html"
      controller: "candIndexCtrl",
      controllerAs: "indexVM"
      // template: "<h2>This is the candidates index page.</h2>"
    });
  }
  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  function candIndexCtrl(Candidate) {
    var vm = this;
    vm.candidates = Candidate.all;
  }
})();
