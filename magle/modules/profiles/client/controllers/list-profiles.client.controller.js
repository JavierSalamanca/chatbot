(function () {
  'use strict';

  angular
    .module('profiles')
    .controller('ProfilesListController', ProfilesListController);

  ProfilesListController.$inject = ['$scope', 'ProfilesService', 'Authentication' /*,'$translate'*/];

  function ProfilesListController($scope,ProfilesService, Authentication /*, $translate*/) {
    var vm = this;
    vm.profile = Authentication;
    //vm.profiles = ProfilesService.query();

    $scope.changeLanguage = function (key) {
      /* $translate.use(key); */
    };

  }
}());
