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
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ])
  .controller("candShowCtrl", [
    "Candidate",
    "$stateParams",
    "$window",
    candShowCtrl
  ]);

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
    };
    return Candidate;
  }

  function candIndexCtrl (Candidate){
    this.candidates = Candidate.all;
  }

  function candShowCtrl(Candidate, $stateParams, $window){
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    });
    vm.update = function(){
      Candidate.update({name: vm.candidate.name}, {candidate: vm.candidate}, function(){
        console.log("Candidate updated successfully");
      });
    };
    vm.delete = function(){
      Candidate.remove({name: vm.candidate.name}, function(){
        $window.location.replace("/");
      });
    };
  }

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

})();
