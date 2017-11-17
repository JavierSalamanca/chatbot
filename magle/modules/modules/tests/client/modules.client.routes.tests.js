(function () {
  'use strict';

  describe('Modules Route Tests', function () {
    // Initialize global variables
    var $scope,
      ModulesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ModulesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ModulesService = _ModulesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('modules');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/modules');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ModulesController,
          mockModule;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('modules.view');
          $templateCache.put('modules/modules/client/views/view-module.client.view.html', '');

          // create mock Module
          mockModule = new ModulesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Module Name'
          });

          // Initialize Controller
          ModulesController = $controller('ModulesController as vm', {
            $scope: $scope,
            moduleResolve: mockModule
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:moduleId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.moduleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            moduleId: 1
          })).toEqual('/modules/1');
        }));

        it('should attach an Module to the controller scope', function () {
          expect($scope.vm.module._id).toBe(mockModule._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/modules/client/views/view-module.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ModulesController,
          mockModule;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('modules.create');
          $templateCache.put('modules/modules/client/views/form-module.client.view.html', '');

          // create mock Module
          mockModule = new ModulesService();

          // Initialize Controller
          ModulesController = $controller('ModulesController as vm', {
            $scope: $scope,
            moduleResolve: mockModule
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.moduleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/modules/create');
        }));

        it('should attach an Module to the controller scope', function () {
          expect($scope.vm.module._id).toBe(mockModule._id);
          expect($scope.vm.module._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/modules/client/views/form-module.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ModulesController,
          mockModule;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('modules.edit');
          $templateCache.put('modules/modules/client/views/form-module.client.view.html', '');

          // create mock Module
          mockModule = new ModulesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Module Name'
          });

          // Initialize Controller
          ModulesController = $controller('ModulesController as vm', {
            $scope: $scope,
            moduleResolve: mockModule
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:moduleId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.moduleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            moduleId: 1
          })).toEqual('/modules/1/edit');
        }));

        it('should attach an Module to the controller scope', function () {
          expect($scope.vm.module._id).toBe(mockModule._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/modules/client/views/form-module.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
