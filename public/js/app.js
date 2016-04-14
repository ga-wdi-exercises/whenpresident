"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])

  .config([
    "$stateProvider",
    "$locationProvider"
    Router
  ])

  .factory("Candidate", [
    "$resource",
    Candidate
  ])

  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ]);

  function Router($stateProvider, $locationProvider){
    $locationProvider.html5(true)
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/html/app-welcome.html"
      })

      .state("index", {
        url: "/candidates",
        templateUrl: "/assets/html/candidates-index.html",
        controller: "candIndexCtrl",
        controllerAs: "indexVM"
      });
    }

    function Candidate($resource){
      var Candidate = $resource("/api/candidates/:name", {}, {


      })
    }

  })

})();
