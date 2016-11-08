angular
  .module("whenPresident", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("indexCtrl", [
    "Candidate",
    indexController
  ])

  function Router ($stateProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/js/ng-views/welcome.html"
      })
      .state("index", {
        url: "/candidates",
        templateUrl: "/assets/js/ng-views/index.html",
        controller: "indexCtrl",
        controllerAs: "vm"
      })
  }

  function Candidate ($resource) {
    return $resource("/api/candidates/:name", {}, {
      update: { method: "PUT" }
    });
  }

  function indexController (Candidate) {
    this.candidates = Candidate.query()
  }
