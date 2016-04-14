(function() {
  "use strict";

  angular
    .module("candidates")
    .controller("candIndexCtrl", [
      "Candidate",
      candIndexCtrl
    ]);

  function candIndexCtrl(Candidate) {
    var vm = this;
    vm.candidates = Candidate.all;
  }
})();
