(function () {
  'use strict';

  angular
      .module('managers')
      .controller('SettingManagersController', SettingManagersController);

  SettingManagersController.$inject = ['moduleResolve'];

  function SettingManagersController(modules) {
    var vm = this;

    vm.managers = modules;

    $scope.schema = {
      type: "object",
      properties: {
        name: {type: "string", minLength: 2, title: "Name", description: "Name or alias"},
        title: {
          type: "string",
          enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
        }
      }
    };

    $scope.form = [
      "*",
      {
        type: "submit",
        title: "Save"
      }
    ];

    $scope.model = {};

  }
}());
