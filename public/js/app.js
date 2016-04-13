"use strict";

(function(){
  angular
  .module("whenPresident", [
    "ngResource",
    "ui.router"
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider",
    Router
  ])
  .factory("Candidate", Candidate)
  .directive("candidateForm", candidateForm)
  .controller("indexCtrl", indexCtrl)
  .controller("showCtrl", showCtrl);

  function Router($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/public/html/app-welcome.html"
    })
    .state("index", {
      url: "/candidates",
      templateUrl: "/public/html/candidates-index.html",
      controller: "indexCtrl",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/candidates/:name",
      templateUrl: "/public/html/candidates-show.html",
      controller: "showCtrl",
      controllerAs: "vm"
    });
    $urlRouterProvider.otherwise("/");
  }

  Candidate.$inject = [ "$resource" ];
  function Candidate($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  candidateForm.$inject = [ "$state", "$stateParams", "Candidate" ];
  function candidateForm($state, $stateParams, Candidate){
    var directive = {};
    directive.templateUrl = "/public/html/candidates-form.html";
    directive.scope = {
      candidate: "=",
      action: "@"
    }
    directive.link = function(scope){
      var originalName = $stateParams.name;
      scope.create = function(){
        Candidate.save({candidate: scope.candidate}, function(response){
          var candidate = new Candidate(response);
          Candidate.all.push(candidate);
          $state.go("show", {name: candidate.name});
        });
      }
      scope.update = function(){
        Candidate.update({name: originalName}, {candidate: scope.candidate}, function(candidate){
          console.log("Updated!");
          $state.go("show", {name: candidate.name});
        });
      }
      scope.delete = function(){
        var index = Candidate.all.indexOf(scope.candidate);
        Candidate.remove({name: originalName}, function(response){
          Candidate.all.splice(index, 1);
          $state.go("index");
        });
      }
    }
    return directive;
  }

  indexCtrl.$inject = [ "Candidate" ];
  function indexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }

  showCtrl.$inject = [ "$stateParams", "Candidate" ];
  function showCtrl($stateParams, Candidate){
    var vm = this;
    Candidate.all.$promise.then(function(){
      Candidate.all.forEach(function(candidate){
        if(candidate.name === $stateParams.name){
          vm.candidate = candidate;
        }
      });
    });
  }

})();
