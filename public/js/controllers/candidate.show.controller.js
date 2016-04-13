"use strict";

(function(){
  angular
  .module("candidates")
  .controller("CandidateShowController",[
    "CandidateFactory",
    "$stateParams",
    "$window",
    showCtrlr
  ]);

  function showCtrlr(CandidateFactory, $stateParams, $window){
    this.candidate = CandidateFactory.get({name: $stateParams.name});
    this.update = function(){
      CandidateFactory.update({name: this.candidate.name},{candidate: this.candidate});
    }
    this.delete = function(){
      CandidateFactory.remove({name: this.candidate.name}, function(){
        $window.location.replace("/");
      });
    }
  }
})();
