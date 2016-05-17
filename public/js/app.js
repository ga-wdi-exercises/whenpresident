"use strict";

(function(){
  angular
  .module("whenpresident", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
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
  
  Index.$inject = [];
  function Index(){
    var vm = this;
    vm.candidates = [
      {
        "name": "Steve",
        "year": 2024
      },
      {
        "name": "Barry",
        "year": 2008
      },
      {
        "name": "Dubya",
        "year": 2000
      }
    ];
  }
})();