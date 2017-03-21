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
    "$state",
    "Candidate",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
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

  function indexController ($state, Candidate) {
    this.candidates = Candidate.query()
    this.newCandidate = new Candidate()
    this.create = function () {
      this.newCandidate.$save().then(function(candidate){
        $state.go("show", { name: candidate.name })
      })
    }
  }

  function showController ($state, $stateParams, Candidate) {
    this.candidate = Candidate.get({name: $stateParams.name})
    this.update = function () {
      this.candidate.$update({name: $stateParams.name})
    }
    this.destroy = function () {
      this.candidate.$delete({name: $stateParams.name}).then(function(){
        $state.go("index")
      })
    }
  }
