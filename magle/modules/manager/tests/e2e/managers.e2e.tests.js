'use strict';

describe('Managers E2E Tests:', function () {
  describe('Test Managers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/managers');
      expect(element.all(by.repeater('manager in managers')).count()).toEqual(0);
    });
  });
});
