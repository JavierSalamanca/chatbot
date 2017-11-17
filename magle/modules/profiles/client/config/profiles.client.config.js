(function () {
  'use strict';

  angular
    .module('profiles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'My profile',
      state: 'profiles.user',
      type: 'item',
      roles: ['learner'],
      position: 1
    });
  }
}());
