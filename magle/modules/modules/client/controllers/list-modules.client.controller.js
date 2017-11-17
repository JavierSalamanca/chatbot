(function () {
  'use strict';

  angular
    .module('modules')
    .controller('ModulesListController', ModulesListController);

  ModulesListController.$inject = ['ModulesService'];

  function ModulesListController(ModulesService) {
    var vm = this;

    vm.modules = ModulesService.query();
  }
}());
