"use strict";

(function(){

  angular
  .module("candidates", [
    "ui.router",
    "ngResource",
  ])
  //configure the router
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    Candidate
  ])
  .controller("candIndexCtrl", [
    "Candidate",
    candIndexCtrl
  ])
  .controller("candShowCtrl", [
    "Candidate",
    "$stateParams",
    "$state",
    "$window",
    candShowCtrl
  ]);

  function Router ($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html"
      //templates are specified via app.use("/assets", express.static("public")); in index.js
    })
    .state('index', {
      url:"/candidates",
      templateUrl: "/assets/html/candidates-index.html",
      controller: candIndexCtrl,
      controllerAs: "indexVM"
    })
    .state('show', {
      url: "/candidates/:name",
      templateUrl: "/assets/html/candidates-show.html",
      controller: 'candShowCtrl',
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  };

  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "put"}
    });
    Candidate.all = Candidate.query();
    Candidate.find = function(property, value, callback){
      Candidate.all.$promise.then(function(candidates){
        candidates.forEach(function(candidate){
          if(candidate[property] == value) callback(candidate);
        });
      });
    }
    return Candidate;
  }

  function candIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

  function candShowCtrl(Candidate, $stateParams, $state, $window){
    var vm = this;
    Candidate.find("name", $stateParams.name, function(candidate){
      vm.candidate = candidate;
    })
    vm.update = function(){
      console.log(vm.candidate.name);
      Candidate.update({name: $stateParams.name}, {candidate: vm.candidate}, function(){
        console.log('updatesssss');
        $state.go("show", {name: vm.candidate.name}, {reload: true})
      })
    }
    vm.destroy = function(){
      Candidate.delete({name: $stateParams.name}, {candidate: vm.candidate}, function(){
        console.log('candidate deleted...');
        $window.location.replace("/candidates");
      })
    }
  }

})();
