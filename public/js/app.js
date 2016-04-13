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
      templateUrl: "/assets/html/candidates-welcome.html" //why is this .html instead of .hbs?
    })
    .state("index", {
      url: "/candidates",
      template: "<h2>These are all the candidates.</h2>"
    });
  }

})();
