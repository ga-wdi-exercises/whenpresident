"use strict";

(function () {
  angular
    .module("candidates")
    .controller("indexCtrl", [
      "CandidateFactory",
      indexController
    ])

    function indexController (CandidateFactory) {
      var vm = this;
      CandidateFactory.query().$promise.then(function (candidates) {
        vm.candidates = candidates;
      })
    }

})();
