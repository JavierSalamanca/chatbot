(function () {
  'use strict';

  // Managers controller
  angular
    .module('managers')
    .controller('ManagersController', ManagersController);

  ManagersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'managerResolve', 'jsonForm'];

  function ManagersController ($scope, $state, $window, Authentication, manager, jsonForm) {
    var vm = this;
    vm.authentication = Authentication;
    $scope.manager = manager;
    $scope.manager.data = (manager.data) ? (manager.data) : {};
    vm.error = null;
    vm.form = {};
    vm.save = save;

    $scope.formToSave = {};


    // Save Manager
    function save(/* isValid */) {
      debugger;
      /* if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.managerForm');
        return false;
      }*/

      if ($scope.manager._id) {
        $scope.manager.$update(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('managers.list', {
          managerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    $scope.save = save;
  }
}());
