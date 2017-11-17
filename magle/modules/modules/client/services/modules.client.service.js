// Modules service used to communicate Modules REST endpoints
(function () {
  'use strict';

  angular
    .module('modules')
    .factory('ModulesService', ModulesService);

  ModulesService.$inject = ['$resource'];

  function ModulesService($resource) {
    return $resource('api/modules/:moduleId', {
      moduleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
