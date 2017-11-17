// Managers service used to communicate Managers REST endpoints
(function () {
  'use strict';

  angular
    .module('managers')
    .factory('ManagersService', ManagersService);

  ManagersService.$inject = ['$resource'];

  function ManagersService($resource) {
    return $resource('api/managers/:managerId', {
      managerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
