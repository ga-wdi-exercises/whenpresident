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
  .factory("CandidateFactory", [
    "$resource",
    CandidateFactory
  ])
  .controller("candidateIndexController", [
    "CandidateFactory",
    candidateIndexController
  ])
  .controller("candidateShowController", [
    "CandidateFactory",
    "$stateParams",
    candidateShowController
  ]);
  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candidateIndexController",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "/assets/html/candidates-show.html",
      controller: "candidateShowController",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }
  function CandidateFactory ($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {Method: 'PUT'}
    });
    Candidate.all = Candidate.query();
    Candidate.find = function(property, value, callback){
      Candidate.all.$promise.then(function(){
        Candidate.all.forEach(function(candidate){
          if(candidate[property] == value) callback(candidate);
        });
      });
    }
    return Candidate
  }

  function candidateIndexController(CandidateFactory){
    var vm = this;
    vm.candidates = CandidateFactory.all;
  }
  function candidateShowController(CandidateFactory, $stateParams){
    var vm = this;
    CandidateFactory.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    });
    vm.update = function(){
      Candidate.update({name: vm.candidate.name}, {candidate: vm.candidate}, function(){
        console.log("Done");
      });
    }
  }

})();
