angular
  .module("whenPresident", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])

  function Router ($stateProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/js/ng-views/welcome.html"
      })
      .state("index", {
        url: "/candidates",
        templateUrl: "/assets/js/ng-views/index.html"
      })
  }
