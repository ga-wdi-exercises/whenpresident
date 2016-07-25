"use strict";

(function () {
  angular
    .module("candidates")
    .factory("CandidateFactory", [
      "$resource",
      Candidate
    ])

    function Candidate ($resource) {
      return $resource("/api/candidates/:name", {}, {
        update: {method: "PUT"}
      })
    }


})();
