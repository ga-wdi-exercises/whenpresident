"use strict";

(function(){
  
  angular
    .module("when-president", [
      "ui.router",
      "candidates"
    ])
    .config([
      "$stateProvider",
      Router
    ]);

  function Router($stateProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/html/app-welcome.html"
      })
      .state("index", {
        url:         "/candidates",
        templateUrl: "/assets/html/candidates-index.html"
      });
  }

})();
