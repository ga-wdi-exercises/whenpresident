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
      // Candidate.find = function(property, paramsValue, callback) {
      //   Candidate.all.$promise.then(function() {
      //     Candidate.all.forEach(function(candidate) {
      //       if (candidate[property] === paramsValue) {
      //         callback(candidate);
      //       }
      //     });
      //   });
      // }
      return Candidate;
    }

    function candidatesIndexControllerFunction(CandidateFactory) {
      this.candidates = CandidateFactory.all;
    }

    function candidatesShowControllerFunction(CandidateFactory, $stateParams) {
      // var vm = this;
      // CandidateFactory.find("name", $stateParams.name, function(candidate) {
      //   vm.candidate = candidate;
      // });
      this.candidate = CandidateFactory.get({name: $stateParams.name});
    }
})();
