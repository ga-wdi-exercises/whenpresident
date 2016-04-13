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
    candShowCtrl
  ]);
  function Router($stateProvider, $locationProvider, $urlRouterProvider) {
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
    $urlRouterProvider.otherwise("/");  //Redirects any route not defined by a state to the index state.//
  }

  function Candidate($resource) {     //What is the purpose of this function?//
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();          //What exactly is going on here?//
    Candidate.find = function(property, value, callback) {
      Candidate.all.$promise.then(function() {
        Candidate.all.forEach(function(candidate) {
          if(candidate[property] == value) callback(candidate);
        });
      });
    };
    return Candidate;
  }

  function candIndexCtrl(Candidate) {
    var vm = this;
    vm.candidates = Candidate.all;
  }

  function candShowCtrl(Candidate, $stateParams) {
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate) {
      vm.candidate = candidate;
    });
  }
})();
