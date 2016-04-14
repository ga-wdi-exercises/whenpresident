"use strict";

(function(){
  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .factory("CandidateF", [
    "$resource",
    CandidateFFunction
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    Router
  ])
  .controller("candIndexCtrl", [
      "CandidateF",
      candIndexControllerFunction
    ])
    .controller("candShowController", [
      "CandidateFactory",
      "$stateParams",
      candShowControllerFunction
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
      templateUrl: "/assets/html/candiates-show.html",
      controller: "candShowCtrl",
      controllerAs: "candShowVM"
    });
  }

  function CandidateFFunction($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });

    Candidate.all = Candidate.query();
    return Candidate;

  }
  function candIndexCtrl(CandidateF){
    var vm = this;
    vm.candidates = CandidateF.all;
  }
  function candShowControllerFunction(CandidateF, $stateParams) {
     var vm = this;
   vm.candidate = CandidateF.get({name: $stateParams.name});
    vm.update = function() {
      CandidateF.update({name: vm.candidate.name}, {candidate: vm.candidate}, function() {
       console.log("Success");
       });
       }
 }

})();
