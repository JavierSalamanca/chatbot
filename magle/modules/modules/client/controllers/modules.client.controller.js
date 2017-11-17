(function () {
  'use strict';

  // Modules controller
  angular
    .module('modules')
    .controller('ModulesController', ModulesController);

  ModulesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'moduleResolve'];

  function ModulesController ($scope, $state, $window, Authentication, module) {
    var vm = this;

    vm.authentication = Authentication;
    vm.module = module;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Module
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.module.$remove($state.go('modules.list'));
      }
    }

    // Save Module
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.moduleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.module._id) {
        vm.module.$update(successCallback, errorCallback);
      } else {
        vm.module.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('modules.view', {
          moduleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
