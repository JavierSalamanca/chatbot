(function () {
  'use strict';

  angular
      .module('profiles')
      .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
        .state('profiles', {
          abstract: true,
          url: '/profiles',
          template: '<ui-view/>',
          data: {
            roles: ['learner']
          }
        })
        .state('profiles.user', {
          url: '/user-profile',
          templateUrl: 'modules/profiles/client/views/user-profile.client.view.html',
          controller: 'ProfilesListController',
          controllerAs: 'vm',
          data: {
              roles: ['learner']
          }
        })
        .state('profiles.admin', {
          url: '/admin-profile',
          templateUrl: 'modules/profiles/client/views/admin-profile.client.view.html',
          controller: 'ProfilesListController',
          controllerAs: 'vm',
          data: {
            roles: ['admin']
          },
          ncyBreadcrumb: {
            label: 'Administrator Profile'
          }
        })
        .state('profiles.list', {
          url: '',
          templateUrl: 'modules/profiles/client/views/list-profiles.client.view.html',
          controller: 'ProfilesListController',
          controllerAs: 'vm',
          data: {
            pageTitle: 'Profiles List'
          }
        })
        .state('profiles.create', {
          url: '/create',
          templateUrl: 'modules/profiles/client/views/form-profile.client.view.html',
          controller: 'ProfilesController',
          controllerAs: 'vm',
          resolve: {
            profileResolve: newProfile
          },
          data: {
            pageTitle: 'Profiles Create'
          }
        })
        .state('profiles.edit', {
          url: '/:profileId/edit',
          templateUrl: 'modules/profiles/client/views/form-profile.client.view.html',
          controller: 'ProfilesController',
          controllerAs: 'vm',
          resolve: {
            profileResolve: getProfile
          },
          data: {
            pageTitle: 'Edit Profile {{ profileResolve.name }}'
          }
        })
        .state('profiles.view', {
          url: '/:profileId',
          templateUrl: 'modules/profiles/client/views/view-profile.client.view.html',
          controller: 'ProfilesController',
          controllerAs: 'vm',
          resolve: {
            profileResolve: getProfile
          },
          data: {
            pageTitle: 'Profile {{ profileResolve.name }}'
          }
        });

  }

  getProfile.$inject = ['$stateParams', 'ProfilesService'];

  function getProfile($stateParams, ProfilesService) {
    return ProfilesService.get({
      profileId: $stateParams.profileId
    }).$promise;
  }

  newProfile.$inject = ['ProfilesService'];

  function newProfile(ProfilesService) {
    return new ProfilesService();
  }
}());
