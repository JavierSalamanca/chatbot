(function () {
  'use strict';

  // Managers controller
  angular
    .module('managers')
    .controller('DashboardManagerController', DashboardManagerController);

  DashboardManagerController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function DashboardManagerController ($scope, $state, $window, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    //vm.manager = manager;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Manager
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.manager.$remove($state.go('environment.list'));
      }
    }

    // Save Manager
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.managerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.manager._id) {
        vm.manager.$update(successCallback, errorCallback);
      } else {
        vm.manager.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('managers.view', {
          managerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
