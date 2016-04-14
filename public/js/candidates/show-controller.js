(function() {
  "use strict";

  angular
    .module("candidates")
    .controller("candShowCtrl", [
      "Candidate",
      "$stateParams",
      CandidateCtrl
    ]);

  function CandidateCtrl(Candidate, $stateParams) {
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate) {
      vm.candidate = candidate;
    });
    vm.update = function() {
      Candidate.update({name: vm.candidate.name},
        {candidate: vm.candidate},
        function() {
          console.log("Updated!");
        });
    };
  }

})();
