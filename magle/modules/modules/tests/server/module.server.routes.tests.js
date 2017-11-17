'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Module = mongoose.model('Module'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  module;

/**
 * Module routes tests
 */
describe('Module CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Module
    user.save(function () {
      module = {
        name: 'Module name'
      };

      done();
    });
  });

  it('should be able to save a Module if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Module
        agent.post('/api/modules')
          .send(module)
          .expect(200)
          .end(function (moduleSaveErr, moduleSaveRes) {
            // Handle Module save error
            if (moduleSaveErr) {
              return done(moduleSaveErr);
            }

            // Get a list of Modules
            agent.get('/api/modules')
              .end(function (modulesGetErr, modulesGetRes) {
                // Handle Modules save error
                if (modulesGetErr) {
                  return done(modulesGetErr);
                }

                // Get Modules list
                var modules = modulesGetRes.body;

                // Set assertions
                (modules[0].user._id).should.equal(userId);
                (modules[0].name).should.match('Module name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Module if not logged in', function (done) {
    agent.post('/api/modules')
      .send(module)
      .expect(403)
      .end(function (moduleSaveErr, moduleSaveRes) {
        // Call the assertion callback
        done(moduleSaveErr);
      });
  });

  it('should not be able to save an Module if no name is provided', function (done) {
    // Invalidate name field
    module.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Module
        agent.post('/api/modules')
          .send(module)
          .expect(400)
          .end(function (moduleSaveErr, moduleSaveRes) {
            // Set message assertion
            (moduleSaveRes.body.message).should.match('Please fill Module name');

            // Handle Module save error
            done(moduleSaveErr);
          });
      });
  });

  it('should be able to update an Module if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Module
        agent.post('/api/modules')
          .send(module)
          .expect(200)
          .end(function (moduleSaveErr, moduleSaveRes) {
            // Handle Module save error
            if (moduleSaveErr) {
              return done(moduleSaveErr);
            }

            // Update Module name
            module.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Module
            agent.put('/api/modules/' + moduleSaveRes.body._id)
              .send(module)
              .expect(200)
              .end(function (moduleUpdateErr, moduleUpdateRes) {
                // Handle Module update error
                if (moduleUpdateErr) {
                  return done(moduleUpdateErr);
                }

                // Set assertions
                (moduleUpdateRes.body._id).should.equal(moduleSaveRes.body._id);
                (moduleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Modules if not signed in', function (done) {
    // Create new Module model instance
    var moduleObj = new Module(module);

    // Save the module
    moduleObj.save(function () {
      // Request Modules
      request(app).get('/api/modules')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Module if not signed in', function (done) {
    // Create new Module model instance
    var moduleObj = new Module(module);

    // Save the Module
    moduleObj.save(function () {
      request(app).get('/api/modules/' + moduleObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', module.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Module with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/modules/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Module is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Module which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Module
    request(app).get('/api/modules/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Module with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Module if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Module
        agent.post('/api/modules')
          .send(module)
          .expect(200)
          .end(function (moduleSaveErr, moduleSaveRes) {
            // Handle Module save error
            if (moduleSaveErr) {
              return done(moduleSaveErr);
            }

            // Delete an existing Module
            agent.delete('/api/modules/' + moduleSaveRes.body._id)
              .send(module)
              .expect(200)
              .end(function (moduleDeleteErr, moduleDeleteRes) {
                // Handle module error error
                if (moduleDeleteErr) {
                  return done(moduleDeleteErr);
                }

                // Set assertions
                (moduleDeleteRes.body._id).should.equal(moduleSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Module if not signed in', function (done) {
    // Set Module user
    module.user = user;

    // Create new Module model instance
    var moduleObj = new Module(module);

    // Save the Module
    moduleObj.save(function () {
      // Try deleting Module
      request(app).delete('/api/modules/' + moduleObj._id)
        .expect(403)
        .end(function (moduleDeleteErr, moduleDeleteRes) {
          // Set message assertion
          (moduleDeleteRes.body.message).should.match('User is not authorized');

          // Handle Module error error
          done(moduleDeleteErr);
        });

    });
  });

  it('should be able to get a single Module that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Module
          agent.post('/api/modules')
            .send(module)
            .expect(200)
            .end(function (moduleSaveErr, moduleSaveRes) {
              // Handle Module save error
              if (moduleSaveErr) {
                return done(moduleSaveErr);
              }

              // Set assertions on new Module
              (moduleSaveRes.body.name).should.equal(module.name);
              should.exist(moduleSaveRes.body.user);
              should.equal(moduleSaveRes.body.user._id, orphanId);

              // force the Module to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Module
                    agent.get('/api/modules/' + moduleSaveRes.body._id)
                      .expect(200)
                      .end(function (moduleInfoErr, moduleInfoRes) {
                        // Handle Module error
                        if (moduleInfoErr) {
                          return done(moduleInfoErr);
                        }

                        // Set assertions
                        (moduleInfoRes.body._id).should.equal(moduleSaveRes.body._id);
                        (moduleInfoRes.body.name).should.equal(module.name);
                        should.equal(moduleInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Module.remove().exec(done);
    });
  });
});
