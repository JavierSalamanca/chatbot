(function () {
  'use strict';

  angular
    .module('modules')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('modules', {
        abstract: true,
        url: '/modules',
        template: '<ui-view/>'
      })
      .state('modules.list', {
        url: '',
        templateUrl: 'modules/modules/client/views/list-modules.client.view.html',
        controller: 'ModulesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Modules List'
        }
      })
      .state('modules.create', {
        url: '/create',
        templateUrl: 'modules/modules/client/views/form-module.client.view.html',
        controller: 'ModulesController',
        controllerAs: 'vm',
        resolve: {
          moduleResolve: newModule
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Modules Create'
        }
      })
      .state('modules.edit', {
        url: '/:moduleId/edit',
        templateUrl: 'modules/modules/client/views/form-module.client.view.html',
        controller: 'ModulesController',
        controllerAs: 'vm',
        resolve: {
          moduleResolve: getModule
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Module {{ moduleResolve.name }}'
        }
      })
      .state('modules.view', {
        url: '/:moduleId',
        templateUrl: 'modules/modules/client/views/view-module.client.view.html',
        controller: 'ModulesController',
        controllerAs: 'vm',
        resolve: {
          moduleResolve: getModule
        },
        data: {
          pageTitle: 'Module {{ moduleResolve.name }}'
        }
      });
  }

  getModule.$inject = ['$stateParams', 'ModulesService'];

  function getModule($stateParams, ModulesService) {
    return ModulesService.get({
      moduleId: $stateParams.moduleId
    }).$promise;
  }

  newModule.$inject = ['ModulesService'];

  function newModule(ModulesService) {
    return new ModulesService();
  }
}());
