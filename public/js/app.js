"use strict";

(function(){
  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    Router
  ]);

  function Router ($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true)
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candIndexCtrl",
      controllerAs:"indexVM"
    })
    .state("show", {
      url: "/candidate/:id",
      templateUrl: "/assets/html/candiates-show.html"
    });
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
