(function () {
  'use strict';

  describe('Managers Controller Tests', function () {
    // Initialize global variables
    var ManagersController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ManagersService,
      mockManager;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ManagersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ManagersService = _ManagersService_;

      // create mock Manager
      mockManager = new ManagersService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Manager Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Managers controller.
      ManagersController = $controller('ManagersController as vm', {
        $scope: $scope,
        managerResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleManagerPostData;

      beforeEach(function () {
        // Create a sample Manager object
        sampleManagerPostData = new ManagersService({
          name: 'Manager Name'
        });

        $scope.vm.manager = sampleManagerPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ManagersService) {
        // Set POST response
        $httpBackend.expectPOST('api/managers', sampleManagerPostData).respond(mockManager);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Manager was created
        expect($state.go).toHaveBeenCalledWith('managers.view', {
          managerId: mockManager._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/managers', sampleManagerPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Manager in $scope
        $scope.vm.manager = mockManager;
      });

      it('should update a valid Manager', inject(function (ManagersService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/managers\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('managers.view', {
          managerId: mockManager._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ManagersService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/managers\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Managers
        $scope.vm.manager = mockManager;
      });

      it('should delete the Manager and redirect to Managers', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/managers\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('environment.list');
      });

      it('should should not delete the Manager and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
