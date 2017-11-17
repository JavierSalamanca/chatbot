(function () {
  'use strict';

  angular
    .module('managers')
    .controller('ManagersListController', ManagersListController);

  ManagersListController.$inject = ['moduleResolve'];

  function ManagersListController(modules) {
    var vm = this;

    vm.managers = modules;
  }
}());
