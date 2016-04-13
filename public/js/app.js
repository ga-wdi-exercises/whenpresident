"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ]);

  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider"
    Router
  ]);
  .factory("Candidate", [

    .controller("canIndexCtrl", [
      "Candidate",
      canIndexCtrl
    ])
    .controller("canShowCtrl", [
      "Candidate",
      "$stateParams",
      canShowCtrl
    ]);
    function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/candidates-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      template:"<h2> This is the candidates index page.</h2>"
    });
    .state("show", {
      url: "candidates/:name",
      templateUrl: "/assets/html/candidates-show.html",
      controller: "canShowCtrl",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    Candidate.find = function(property, value, callback){
      Candidate.all.$promise.then(function(){
        Candidate.all.forEach(function(){
          if(candidate[property] == value) callback(candidate);
        });
      });
    }
    return Candidate;
  }
  function canIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

  function(canShowCtrl(Candidate, $stateParams){
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    });
    vm.update = function(){
      Candidate.update({name: vm.candidate.name}, {candidates: vm.candidate}, function(){
        console.log("DONE!!!!!!");
      })
    }
  }
})();
