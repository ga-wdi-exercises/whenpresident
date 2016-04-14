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
    Candidate.all  = Candidate.query();
    Candidate.find = function(property, value, callback) {
      Candidate.all.$promise.then(function() {
        for (var i = 0; i < Candidate.all.length; i++) {
          var candidate = Candidate.all[i];
          if (candidate[property] === value) {
            callback(candidate);
            break;
          }
        }
      });
    };
    return Candidate;
  }
})();
