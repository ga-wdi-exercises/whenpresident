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
  .controller("CandidateShowController", [
    "Candidate",
    "$stateParams",
    CandidateShowCtrlFunction
  ])

  function FactoryFunction($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    Candidate.find = function(property, value, callback){
      Candidate.all.$promise.then(function(){
        Candidate.all.forEach(function(candidate){
          if(candidate[property] == value) callback(candidate);
        });
      });
    };
    return Candidate;
  }

  function CandidateIndexCtrlFunction(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
    // this.candidate = Candidate.query();
    // this.newCandidate = new Candidate();
  }

  function CandidateShowCtrlFunction(Candidate,$stateParams){
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    });
  }

  function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html",
      controller: "CandidateIndexController",
      controllerAs: "indexVM"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html"
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "assets/html/candidates-show.html",
      controller: "CandidateShowController",
      controllerAs: "showVM"
    })
    $urlRouterProvider.otherwise("/");
  }



})();
