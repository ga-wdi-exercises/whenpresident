"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$locationProvider",
    Router
  ])
function Router($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true); ..
    .state("welcome",{
      url:"/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
  .state("index",{
    url:"/candidates",
    template: "<h2>This is the candidates index page.</h2>"
  });
 }
})();
