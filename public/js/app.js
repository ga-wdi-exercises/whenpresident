"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    CandidateFactory
  ])
  .controller("CandidateIndexCtrl", [
    "CandidateFactory",
    CandidateIndexCtrlFunction
  ]);

  function CandidateFactory( $resource ){
    return $resource( "http://localhost:3001/api/candidates/:name", {}, {
        update: { method: "PUT" }
    });
  }

  function CandidateIndexCtrlFunction (CandidateFactory){
    this.candidates = CandidateFactory.query();
  }

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html"
    });
  }

})();
