'use strict';

describe('Modules E2E Tests:', function () {
  describe('Test Modules page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/modules');
      expect(element.all(by.repeater('module in modules')).count()).toEqual(0);
    });
  });
});
