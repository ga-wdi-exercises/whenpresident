"use strict";

(function(){
  angular
  .module("candidates")
  .controller("CandidateShowController",[
    "CandidateFactory",
    "$stateParams",
    showCtrlr
  ]);

  function showCtrlr(CandidateFactory, $stateParams){
    this.candidate = CandidateFactory.get({name: $stateParams.name});
  }
})();
