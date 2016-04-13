"use strict";

(function(){
  angular
  .module("candidates")
  .factory("CandidateFactory",[
    "$resource",
    FactoryFunction
  ]);

  function FactoryFunction($resource){
    return $resource("http://localhost:3001/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
  }
})();
