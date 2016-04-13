// "use strict";

(function(){
  angular.module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    function($stateProvider){
      $stateProvider
      .state("index", {
        url: "/candidates",
        templateUrl: "/assets/html/candidates-index.html",
        controller: "IndexCtrl",
        controllerAs: "indexVM"
      })
      .state("show", {
        url: "/candidates/:name",
        templateUrl: "/assets/html/candidates-show.html",
        controller: "ShowCtrl",
        controllerAs: "showVM"
      });
    }
  ])
  .factory("Candidate", [
    "$resource", function($resource){
      var Candidate = $resource("/api/candidates/:name", {}, {
        update: {method: "PUT"}
      });
      Candidate.all = Candidate.query();
      Candidate.find = function(property, value, callback) {
        Candidate.all.$promise.then(function(){
          Candidate.all.forEach(function(candidate){
            if(candidate[property] == value) callback(candidate);
          });
        });
      };
      return Candidate;
    }
  ])
  .controller("IndexCtrl", ["Candidate", function(Candidate) {
    var vm = this;
    vm.candidates = Candidate.all;
  }])
  .controller("ShowCtrl", [
    "Candidate",
    "$stateParams",
    function(Candidate, $stateParams) {
      var vm = this;
      Candidate.find("name", $stateParams.name, function(candidate) {
        vm.candidate = candidate;
      });
    }
  ]);

})();
