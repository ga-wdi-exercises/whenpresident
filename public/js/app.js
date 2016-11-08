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
  .controller("showCtrl", [
    "$stateParams",
    "Candidate",
    showController
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
      .state("show", {
        url: "/candidates/:name",
        templateUrl: "/assets/js/ng-views/show.html",
        controller: "showCtrl",
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

  function showController ($stateParams, Candidate) {
    this.candidate = Candidate.get({name: $stateParams.name})
  }
