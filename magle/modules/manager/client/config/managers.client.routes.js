(function () {
  'use strict';

  angular
      .module('managers')
      .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
        .state('environment', {
          abstract: true,
          url: '/environment',
          template: '<ui-view/>'
        })
        .state('environment.list', {
          url: '',
          templateUrl: 'modules/manager/client/views/list-managers.client.view.html',
          controller: 'ManagersListController',
          controllerAs: 'vm',
          data: {
            roles: ['dataAnalyser', 'admin'],
            pageTitle: 'Managers List'
          },
          resolve: {
            moduleResolve: moduleList
          }
        })
        .state('environment.edit', {
          url: '/:managerId/edit',
          templateUrl: 'modules/manager/client/views/form-module.client.view.html',
          controller: 'ManagersController',

          data: {
            pageTitle: 'Edit Manager {{ managerResolve.name }}'
          },
          resolve: {
            managerResolve: getManager
          }
        })

        .state('environment.settings', {
          url: '/settings',
          templateUrl: 'modules/manager/client/views/settings-managers.client.view.html',
          controller: 'SettingManagersController',
          controllerAs: 'vm',
          data: {
            roles: ['learner', 'admin']
          }
        })

        .state('environment.view', {
          url: '/:managerId',
          templateUrl: 'modules/manager/client/views/view-manager.client.view.html',
          controller: 'ManagersController',
          controllerAs: 'vm',
          resolve: {
            managerResolve: getManager
          },
          data: {
            pageTitle: 'Manager {{ managerResolve.name }}'
          }
        });
  }

  getManager.$inject = ['$stateParams', 'ManagersService'];

  function getManager($stateParams, ManagersService) {
    return ManagersService.get({
      managerId: $stateParams.managerId
    }).$promise;
  }

  getModule.$inject = ['$stateParams', 'ModuleService'];
  function getModule($stateParams, ModulesService) {
    debugger;
    return ManagersService.get({
      moduleId: $stateParams.moduleId
    }).$promise;
  }

  newManager.$inject = ['ManagersService'];

  function newManager(ManagersService) {
    return new ManagersService();
  }


  moduleList.$inject = ['ManagersService'];

  function moduleList(ManagersService) {
    return ManagersService.query().$promise;
  }

}());
