"use strict";

(function(){
  angular
  .module("whenpresident", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Candidate", Candidate)
  .controller("Show", Show)
  .controller("Index", Index);
  
  Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl:  "/assets/html/candidates-index.html",
      controller:   "Index",
      controllerAs: "IndexVM"
    })
    .state("show", {
      url: "/:name",
      templateUrl:  "/assets/html/candidates-show.html",
      controller:   "Show",
      controllerAs: "ShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }
  
  Candidate.$inject = ["$resource"];
  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    return Candidate;
  }
  
  Index.$inject = ["Candidate"];
  function Index(Candidate){
    var vm = this;
    vm.candidates = Candidate.query();
    vm.create = function(){
      Candidate.save(vm.newCandidate, function(candidate){
        vm.candidates.push(candidate);
      });
    }
  }
  
  Show.$inject = ["Candidate", "$stateParams", "$state"];
  function Show(Candidate, $stateParams, $state){
    var vm = this;
    vm.candidate = Candidate.get($stateParams);
    vm.update = function(){
      Candidate.update($stateParams, vm.candidate, function(candidate){
        $state.go("show", candidate);
      });
    }
  }
})();
