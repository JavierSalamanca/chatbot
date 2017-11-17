'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Manager = mongoose.model('ConfigModule'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

var Q = require('q');
var Qfs = require('q-io/fs');
/**
 * Create a Manager
 */
exports.create = function (req, res) {
  var manager = new Manager(req.body);
  manager.user = req.user;

  manager.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manager);
    }
  });
};

/**
 * Show the current Manager
 */
exports.read = function (req, res) {
  var manager = req.manager ? req.manager.toJSON() : {};
  res.jsonp(manager);
};

/**
 * Update a Manager
 */
exports.update = function (req, res) {
  var manager = req.manager;

  manager = _.extend(manager, req.body);

  manager.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manager);
    }
  });
};

/**
 * Delete an Manager
 */
exports.delete = function (req, res) {
  var manager = req.manager;

  manager.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manager);
    }
  });
};

/**
 * List of Managers
 */
var fs = require('fs');
var path = require('path');

exports.list = function (req, res) {

  Manager.find().exec(function (err, triggers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(triggers);
    }
  });

};

function count(moduleName, pathFile, callback) {
  var files = [];
  fs.readFile(pathFile, 'utf8',
      function (err, data) {
        if (err) {
          callback("Module error : " + moduleName);
          errors.push("Module '" + moduleName + "' cannot be readed");
        } else if (!data) {
          callback("No data error : " + moduleName);
          errors.push("Module data '" + moduleName + "' cannot be readed");
          console.log("NO DATA");
        } else {
          try {
            obj = JSON.parse(data);
            files.push(obj);
            console.log("PARSE");
          } catch (err) {
            errors.push("Cannot parse data of '" + moduleName + "'");
          }
        }
      });

  callback("out");

  fs.readFile(pFile, "utf8", function (err, data) {
    callback(data.split("\n").length - 1);
  });
}


/**
 * Manager middleware
 */
exports.managerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Manager is invalid'
    });
  }

  Manager.findById(id).exec(function (err, manager) {
    if (err) {
      return next(err);
    } else if (!manager) {
      return res.status(404).send({
        message: 'No Manager with that identifier has been found'
      });
    }
    req.manager = manager;
    next();
  });
};

