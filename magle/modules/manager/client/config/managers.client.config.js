(function () {
  'use strict';

  angular
    .module('managers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Settings',
      state: 'settings',
      type: 'dropdown',
      roles: ['admin'],
      position: 1
    });

    menuService.addSubMenuItem('topbar', 'settings', {
      title: 'Modules',
      state: 'environment.list',
      roles: ['admin'],
      order: 2
    });

    menuService.addSubMenuItem('topbar', 'settings', {
        title: 'Manage Users',
        state: 'admin.users',
        roles: ['admin'],
        order: 1
    });

  }
}());
