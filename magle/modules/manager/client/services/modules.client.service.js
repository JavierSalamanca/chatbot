// Managers service used to communicate Managers REST endpoints
(function () {
  'use strict';

  angular
    .module('managers')
    .factory('ModulesService', ModulesService);

  ModulesService.$inject = ['$resource'];

  function ModulesService($resource) {
    return $resource('api/modules/:moduleId', {
      managerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
