"use strict";

(function(){
  angular
  .module("candidates")
  .controller("CandidatesIndexController", [
    "CandidateFactory",
    indexCtrlr
  ]);
  function indexCtrlr(CandidateFactory){
    this.candidates = CandidateFactory.query();
  }
})();
