"use strict";

(function(){
  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ]);

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html" //why is this .html instead of .hbs?
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/assets/html/candidates-index.html"
    });
  }

})();
