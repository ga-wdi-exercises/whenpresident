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
  .controller("candidIndexController", [
      "Candidate",
      candIndexController
  ])
  .controller("candShowController", [
     "Candidate",
    "$stateParams",
     candShowController
    ]);

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
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "assets/html/candidates-show.html",
      controller: "candidShowController";
      controllerAs: "ShowVM"
    });
    $urlRouterProvider.otherwise("/")
  }

  function Candidate($resource){
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
     }
    return Candidate;
  }

  function candIndexController(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

  function candShowController(Candidate, $stateParams){
     var vm = this;
     Candidate.find("name", $stateParams.name, function(candidate){
       vm.candidate = candidate;
     });
     vm.update =function(){
       Candidate.update({name: vm.candidate.name}, {candidate: vm.candidate}, function(){
         console.log("Done!");
       });
     }
   }
})();
