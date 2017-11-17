'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider', '$httpProvider', /* '$translateProvider', */
      function ($locationProvider, $httpProvider /*, $translateProvider*/) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('authInterceptor');

        // Add list of available languages.
        /* $translateProvider.registerAvailableLanguageKeys(['en_US', 'es_CL'], {
          'en': 'en_US',
          'es': 'es_CL'
        });


        $translateProvider.useStaticFilesLoader({
          prefix: 'lang/lang_',
          suffix: '.json'
        });


        $translateProvider.preferredLanguage('es');
        $translateProvider.fallbackLanguage("en_US");

        console.log("Redy"); */


      }
    ]);

angular.module(ApplicationConfiguration.applicationModuleName)
    .run(function ($rootScope, $state, Authentication) {




      // Redirect to main page by user
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        //console.log("TO STATE : " + toState.name);
        if (toState.name === 'home') {
          if (Authentication.user) { // Check if user allowed to transition
            event.preventDefault();   // Prevent migration to default state
            if (Authentication.user.roles.indexOf('admin') === 0) {
              $state.go('profiles.admin');
            } else if (Authentication.user.roles.indexOf('learner') === 0) {
              $state.go('profiles.user');
            } else if (Authentication.user.roles.indexOf('dataAnalyser') === 0) {
              $state.go('environment.list');
            }
          }
        }
      });

      // Check authentication before changing state
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
          var allowed = false;
          toState.data.roles.forEach(function (role) {
            if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
              allowed = true;
              return true;

            }
          });

          if (!allowed) {
            event.preventDefault();
            if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
              $state.go('forbidden');
            } else {
              $state.go('authentication.signin').then(function () {
                storePreviousState(toState, toParams);
              });
            }
          }
        }
      });

      // Record previous state
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        storePreviousState(fromState, fromParams);
      });

      // Store previous state
      function storePreviousState(state, params) {
        // only store this state if it shouldn't be ignored
        if (!state.data || !state.data.ignoreState) {
          $state.previous = {
            state: state,
            params: params,
            href: $state.href(state, params)
          };
        }
      }
    });

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
