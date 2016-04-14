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
      })
      .state("show", {
        url:          "/candidates/:name",
        templateUrl:  "/assets/html/candidates-show.html",
        controller:   "candShowCtrl",
        controllerAs: "showVM"
      });

      // Default to root if path doesn't match
      $urlRouterProvider.otherwise("/");
  }
})();
