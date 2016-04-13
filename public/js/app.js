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
    .factory("CandidateFactory", [
      "$resource",
      CandidateFactoryFunction
    ])
    .controller("candidatesIndexController", [
      "CandidateFactory",
      candidatesIndexControllerFunction
    ])
    .controller("candidatesShowController", [
      "CandidateFactory",
      "$stateParams",
      "$window",
      candidatesShowControllerFunction
    ]);

    function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);
      $stateProvider
        .state("welcome", {
          url: "/",
          templateUrl: "/assets/html/app-welcome.html"
        })
        .state("candidatesIndex", {
          url: "/candidates",
          templateUrl: "/assets/html/candidates-index.html",
          controller: "candidatesIndexController",
          controllerAs: "candidatesIndexVM"
        })
        .state("candidatesShow", {
          url: "/candidates/:name",
          templateUrl: "/assets/html/candidates-show.html",
          controller: "candidatesShowController",
          controllerAs: "candidatesShowVM"
        });
        $urlRouterProvider.otherwise("/");
    }

    function CandidateFactoryFunction($resource) {
      var Candidate = $resource("/api/candidates/:name", {}, {
        update: {method: "PUT"}
      });
      Candidate.all = Candidate.query();
      return Candidate;
    }

    function candidatesIndexControllerFunction(CandidateFactory) {
      this.candidates = CandidateFactory.all;
    }

    function candidatesShowControllerFunction(CandidateFactory, $stateParams, $window) {
      var vm = this;
      vm.candidate = CandidateFactory.get({name: $stateParams.name});
      vm.update = function() {
        CandidateFactory.update({name: vm.candidate.name}, {candidate: vm.candidate}, function() {
          console.log("Success");
        });
      }
      vm.delete = function() {
        CandidateFactory.delete({name: vm.candidate.name}, function() {
          $window.location.replace("/");
        });
      }
    }
})();
