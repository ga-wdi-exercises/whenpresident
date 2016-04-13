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
    "$window",
    candidateShowController
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    //gets rid of hashes in url
    $locationProvider.html5Mode(true)
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
    .state("show",{
      url:"/candidates/:name",
      templateUrl: "/assets/html/candidates-show.html",
      controller: "candidateShowController",
      controllerAs: "showVM"
    })
    // will take you back to homepage if a different URL is provided
    $urlRouterProvider.otherwise("/")
  }

  function CandidateFactory($resource){
    var CandidateFactory = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    CandidateFactory.all = CandidateFactory.query();
    CandidateFactory.find = function(property, value, callback){
      CandidateFactory.all.$promise.then(function(){
        CandidateFactory.all.forEach(function(candidate){
          if(candidate[property] == value) callback(candidate);
        });
      });
    }
    return CandidateFactory;
  }

  function candidateIndexController(CandidateFactory){
    var vm = this;
    vm.candidates = CandidateFactory.all;
  }
  function candidateShowController(CandidateFactory, $stateParams, $window){
    var vm = this;
    console.log("ok");
    console.log($stateParams.name);

    CandidateFactory.find("name", $stateParams.name, function(candidate){
      console.log(candidate);
      console.log($stateParams)

      vm.candidate = candidate;
    });
    vm.update = function(){
      CandidateFactory.update({name: vm.candidate.name}, {candidate: vm.candidate})
    }
    vm.delete = function(){
      CandidateFactory.remoce({name: vm.candidate.name}, function(){
        $window.location.replace("/");
      });
    }
  }
})();
