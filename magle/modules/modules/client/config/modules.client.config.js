(function () {
  'use strict';

  angular
    .module('modules')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Modules',
    //   state: 'modules',
    //   type: 'dropdown',
    //   roles: ['*']
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'modules', {
    //   title: 'List Modules',
    //   state: 'modules.list'
    // });
    //
    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'modules', {
    //   title: 'Create Module',
    //   state: 'modules.create',
    //   roles: ['user']
    // });
  }
}());
