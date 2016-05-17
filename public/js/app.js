"use strict";

(function(){
  angular
  .module("whenpresident", [
    "ui.router",
    "ngResource"
  ])
  .config(Router);
  
  Router.$inject = ["$stateProvider"];
  function Router($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "/assets/html/candidates-index.html"
    })
    .state("show", {
      url: "/:name",
      template: "This is the show page"
    });
  }
})();