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
    "$urlRouterProvider".
    Router
  ])
  .factory("CandidateFactory", [
    "$resource",
    CandidateFactory
  ])
  .controller("candIndexCtrl", [
    "CandidateFactory",
    candIndexCtrl
  ])
  .controller("candShowCtrl", [
    "CandidateFactory",
    "$stateParams",
    "$window",
    candShowCtrl
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
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
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "/assets/html/candidates-show.html",
      controller: "candShowCtrl",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function CandidateFactory($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    Candidate.find = function(property, value, callback) {
      Candidate.all.$promise.then(function(){
        Candidate.all.forEach(function(candidate){
          if(candidate[property] == value) callback(candidate);
        });
      });
    };
    return Candidate;
  } // candidate factory

  function candIndexCtrl(CandidateFactory){
    var vm = this;
    vm.candidates = CandidateFactory.all;
  }

  function candShowCtrl(CandidateFactory, $stateParams, $window){
    var vm = this;
    CandidateFactory.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    });
    vm.update = function(){
      CandidateFactory.update({name: vm.candidate.name}, {candidate: vm.candidate}, function(){
        console.log("Done!");
      });
    };
    vm.delete = function(){
      CandidateFactory({name: vm.candidate.name}, function(){
        $window.location.replace("/");
      });
    }
  }

})();
