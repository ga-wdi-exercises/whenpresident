"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ]);
  //configure the router
  .config([
    "$stateProvider",
    Router
  ])
  function Router ($stateProvider){
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html"
      //templates are specified via app.use("/assets", express.static("public")); in index.js
    });
  };

})();
