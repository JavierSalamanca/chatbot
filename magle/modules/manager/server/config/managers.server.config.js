'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    config = require(path.resolve('./config/config'));

var fs = require('fs');
var Q = require('q');
var Qfs = require('q-io/fs');

var mongoose = require('mongoose');
var Config = mongoose.model('ConfigModule');

/**
 * Managers module init function.
 */
module.exports = function (app, db) {


  var listModules = [];
  // Read first modules

  Config.find({})
      .then(function (listConfig) {

        listModules = listConfig.map(function (item) {
          return item.name;
        });

        fs.readdir(path.resolve('./modules/'),
            function (err, files) {
              if (err) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              }

              var moduleList = [];
              files.forEach(function (moduleName) {
                if (moduleName) {
                  // Verify config file

                  var pathConfigModule = path.resolve('./modules/' + moduleName + "/config.json");
                  var promiseModule = Qfs.exists(pathConfigModule)
                      .then(function (obj) {
                        if (obj) {
                          return Qfs.read(pathConfigModule)
                              .then(function (content) {
                                if (content.length > 0) {
                                  var moduleObj = JSON.parse(content);
                                  if (moduleObj) {
                                    //console.log("+ Loading '" + moduleObj.name + "' " + moduleObj.version + " ...")

                                    // Add a configuration only if no exists a configuration
                                    Config.findOne({name: moduleObj.name})
                                        .then(function (elem) {

                                          if (listModules.indexOf(moduleObj.name) !== -1) {
                                           // console.log(">>> NO INSERT, YA EXISTS" + moduleObj.name)

                                          } else {
                                            console.log("+ New module found '" + moduleObj.name + "' !");
                                            listModules.push(moduleObj.name);

                                            // Check if exists schema
                                            var schemaModel;
                                            if (moduleObj.form) {
                                              schemaModel = moduleObj.form;
                                            } else {
                                              schemaModel = {};   // When is not defined on that
                                            }
                                            var a = new Config({name: moduleObj.name, form: schemaModel});
                                            a.save(function (aa) {
                                              console.log("INSERTED " + moduleObj.name);
                                              return {
                                                name: moduleObj.name,
                                                version: moduleObj.version,
                                                description: moduleObj.description,
                                                author: moduleObj.author
                                              };
                                            });
                                          }
                                        });


                                  } else {


                                    return {};

                                  }
                                } else {
                                  return {};

                                }
                              });
                        } else {
                          console.log("Error loading module '" + pathConfigModule + "'");
                          process.exit(-100);


                          return {};
                        }
                      });

                  // Verify languages
                  var pathLanguages = path.resolve('./modules/' + moduleName + "/client/lang");
                  var promiseLanguage = Qfs.exists(pathLanguages)
                      .then(function (obj) {
                        return (obj)
                      });


                  moduleList.push(Q.all([promiseLanguage, promiseModule]).spread
                  (function (language, module) {
                    return {
                      name: moduleName,
                      info: module,
                      language: language,
                    }
                  }));
                }
              });

              Q.all(moduleList)
                  .then(function (moduleListResolved) {
                    console.log("Success load");
                    // return res.json(moduleListResolved);
                  })
                  .catch(function (err) {
                    console.log(err)
                  });

            });
      });


};
