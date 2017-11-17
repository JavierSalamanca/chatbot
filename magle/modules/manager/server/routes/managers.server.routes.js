'use strict';

/**
 * Module dependencies
 */
var managersPolicy = require('../policies/managers.server.policy'),
  managers = require('../controllers/managers.server.controller');

module.exports = function(app) {
  // Managers Routes
  app.route('/api/managers').all(managersPolicy.isAllowed)
    .get(managers.list)
    .post(managers.create);

  app.route('/api/managers/:managerId').all(managersPolicy.isAllowed)
    .get(managers.read)
    .put(managers.update)
    .delete(managers.delete);

  // Finish by binding the Manager middleware
  app.param('managerId', managers.managerByID);
};
