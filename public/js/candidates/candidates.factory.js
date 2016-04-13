(function() {
  "use strict";

  angular
    .module("candidates")
    .factory("Candidate", [
      "$resource",
      CandidateFunc
    ]);

  function CandidateFunc($resource) {
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }
})();
