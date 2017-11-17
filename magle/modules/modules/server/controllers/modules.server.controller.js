'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Module = mongoose.model('Module'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Module
 */
exports.create = function(req, res) {
  var module = new Module(req.body);
  module.user = req.user;

  module.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(module);
    }
  });
};

/**
 * Show the current Module
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var module = req.module ? req.module.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  module.isCurrentUserOwner = req.user && module.user && module.user._id.toString() === req.user._id.toString();

  res.jsonp(module);
};

/**
 * Update a Module
 */
exports.update = function(req, res) {
  var module = req.module;

  module = _.extend(module, req.body);

  module.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(module);
    }
  });
};

/**
 * Delete an Module
 */
exports.delete = function(req, res) {
  var module = req.module;

  module.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(module);
    }
  });
};

/**
 * List of Modules
 */
exports.list = function(req, res) {
  Module.find().sort('-created').populate('user', 'displayName').exec(function(err, modules) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(modules);
    }
  });
};

/**
 * Module middleware
 */
exports.moduleByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Module is invalid'
    });
  }

  Module.findById(id).populate('user', 'displayName').exec(function (err, module) {
    if (err) {
      return next(err);
    } else if (!module) {
      return res.status(404).send({
        message: 'No Module with that identifier has been found'
      });
    }
    req.module = module;
    next();
  });
};
