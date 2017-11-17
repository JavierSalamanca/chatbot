'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Managers Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/managers',
      permissions: '*'
    }, {
      resources: '/api/managers/:managerId',
      permissions: '*'
    }]
  }, {
    roles: ['learner'],
    allows: [{
      resources: '/api/managers',
      permissions: ['get', 'post']
    }, {
      resources: '/api/managers/:managerId',
      permissions: ['get']
    }]
  }, {
      roles: ['dataAnalyser'],
      allows: [{
          resources: '/api/managers',
          permissions: '*'
      }, {
          resources: '/api/managers/:managerId',
          permissions: '*'
      }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/managers',
      permissions: ['get']
    }, {
      resources: '/api/managers/:managerId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Managers Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Manager is being processed and the current user created it then allow any manipulation
  if (req.manager && req.user && req.manager.user && req.manager.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
