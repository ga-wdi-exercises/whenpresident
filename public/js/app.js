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
      template: "This is the index page"
    })
    .state("show", {
      url: "/:name",
      template: "This is the show page"
    });
  }
})();