'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'mean';
  var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngMessages', 'ui.router', /*'pascalprecht.translate',*/ 'json-form', 'ui.bootstrap', 'ui.bootstrap.tabs', 'ui.utils', 'angularFileUpload', /*'treeControl',*/  'angular-fancytree', 'plotly', 'mgcrea.ngStrap.tab', 'anim-in-out', 'angularPromiseButtons', 'ncy-angular-breadcrumb'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();
