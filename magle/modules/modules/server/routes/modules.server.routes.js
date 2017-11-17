'use strict';

/**
 * Module dependencies
 */
var modulesPolicy = require('../policies/modules.server.policy'),
  modules = require('../controllers/modules.server.controller');

module.exports = function(app) {
  // Modules Routes
  app.route('/api/modules').all(modulesPolicy.isAllowed)
    .get(modules.list)
    .post(modules.create);

  app.route('/api/modules/:moduleId').all(modulesPolicy.isAllowed)
    .get(modules.read)
    .put(modules.update)
    .delete(modules.delete);

  // Finish by binding the Module middleware
  app.param('moduleId', modules.moduleByID);
};
