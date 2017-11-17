(function () {
  'use strict';

  describe('Managers Route Tests', function () {
    // Initialize global variables
    var $scope,
      ManagersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ManagersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ManagersService = _ManagersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('managers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/managers');
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
          ManagersController,
          mockManager;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('managers.view');
          $templateCache.put('modules/managers/client/views/view-manager.client.view.html', '');

          // create mock Manager
          mockManager = new ManagersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Manager Name'
          });

          // Initialize Controller
          ManagersController = $controller('ManagersController as vm', {
            $scope: $scope,
            managerResolve: mockManager
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:managerId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.managerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            managerId: 1
          })).toEqual('/managers/1');
        }));

        it('should attach an Manager to the controller scope', function () {
          expect($scope.vm.manager._id).toBe(mockManager._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/managers/client/views/view-manager.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ManagersController,
          mockManager;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('managers.create');
          $templateCache.put('modules/managers/client/views/form-manager.client.view.html', '');

          // create mock Manager
          mockManager = new ManagersService();

          // Initialize Controller
          ManagersController = $controller('ManagersController as vm', {
            $scope: $scope,
            managerResolve: mockManager
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.managerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/managers/create');
        }));

        it('should attach an Manager to the controller scope', function () {
          expect($scope.vm.manager._id).toBe(mockManager._id);
          expect($scope.vm.manager._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/managers/client/views/form-manager.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ManagersController,
          mockManager;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('managers.edit');
          $templateCache.put('modules/managers/client/views/form-manager.client.view.html', '');

          // create mock Manager
          mockManager = new ManagersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Manager Name'
          });

          // Initialize Controller
          ManagersController = $controller('ManagersController as vm', {
            $scope: $scope,
            managerResolve: mockManager
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:managerId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.managerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            managerId: 1
          })).toEqual('/managers/1/edit');
        }));

        it('should attach an Manager to the controller scope', function () {
          expect($scope.vm.manager._id).toBe(mockManager._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/managers/client/views/form-manager.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
