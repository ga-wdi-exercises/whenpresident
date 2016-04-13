"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ]);
  .config([
    "$stateProvider",
    Router
  ]);

  function Router($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    });
    .state("index", {
      url: "/candidates",
      template: "<h2>This is the candidates index page."</h2>
    })
  }
})();
