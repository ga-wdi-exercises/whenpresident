"use strict";

(function(){
  angular
  .module("whenpresident", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Candidate", Candidate)
  .controller("Index", Index);
  
  Router.$inject = ["$stateProvider"];
  function Router($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl:  "/assets/html/candidates-index.html",
      controller:   "Index",
      controllerAs: "IndexVM"
    })
    .state("show", {
      url: "/:name",
      template: "This is the show page"
    });
  }
  
  Candidate.$inject = ["$resource"];
  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name");
    return Candidate;
  }
  
  Index.$inject = ["Candidate"];
  function Index(Candidate){
    var vm = this;
    vm.candidates = Candidate.query();
  }
})();