"use strict";

(function(){
  
  angular
    .module("when-president", [
      "ui.router",
      "candidates"
    ])
    .config([
      "$locationProvider",
      "$stateProvider",
      "$urlRouterProvider",
      Router
    ]);

  function Router($locationProvider, $stateProvider, $urlRouterProvider) {
    // Acknowledge HTML5 specific base tag routing
    $locationProvider.html5Mode(true);

    // Setup state routing
    $stateProvider
      .state("welcome", {
        url:         "/",
        templateUrl: "/assets/html/app-welcome.html"
      })
      .state("index", {
        url:          "/candidates",
        templateUrl:  "/assets/html/candidates-index.html",
        controller:   "candIndexCtrl",
        controllerAs: "indexVM"
      });
      // Default to root if path doesn't match
      $urlRouterProvider.otherwise("/");
  }
})();
