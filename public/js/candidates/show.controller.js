"use strict";

(function () {
  angular
    .module("candidates")
    .controller("showCtrl", [
      "$stateParams",
      "CandidateFactory",
      "$state",
      ShowController
    ])

    function ShowController ($stateParams, CandidateFactory, $state) {
      var vm = this;
      CandidateFactory.get({name: $stateParams.name}).$promise.then(function (candidate) {
        vm.candidate = candidate;
      })
      vm.update = function () {
        CandidateFactory.update({name: $stateParams.name}, { candidate: vm.candidate }).$promise.then(function (candidate) {
          $state.go("index")
        })
      }
      vm.destroy = function () {
        vm.candidate.$remove({name: $stateParams.name}).then(function (response) {
          if(response.success) $state.go("index")
        })
      }
    }
})();
