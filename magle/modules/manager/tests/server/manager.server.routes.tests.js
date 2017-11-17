'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manager = mongoose.model('Manager'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  manager;

/**
 * Manager routes tests
 */
describe('Manager CRUD tests', function () {

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

    // Save a user to the test db and create new Manager
    user.save(function () {
      manager = {
        name: 'Manager name'
      };

      done();
    });
  });

  it('should be able to save a Manager if logged in', function (done) {
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

        // Save a new Manager
        agent.post('/api/managers')
          .send(manager)
          .expect(200)
          .end(function (managerSaveErr, managerSaveRes) {
            // Handle Manager save error
            if (managerSaveErr) {
              return done(managerSaveErr);
            }

            // Get a list of Managers
            agent.get('/api/managers')
              .end(function (managersGetErr, managersGetRes) {
                // Handle Managers save error
                if (managersGetErr) {
                  return done(managersGetErr);
                }

                // Get Managers list
                var managers = managersGetRes.body;

                // Set assertions
                (managers[0].user._id).should.equal(userId);
                (managers[0].name).should.match('Manager name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Manager if not logged in', function (done) {
    agent.post('/api/managers')
      .send(manager)
      .expect(403)
      .end(function (managerSaveErr, managerSaveRes) {
        // Call the assertion callback
        done(managerSaveErr);
      });
  });

  it('should not be able to save an Manager if no name is provided', function (done) {
    // Invalidate name field
    manager.name = '';

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

        // Save a new Manager
        agent.post('/api/managers')
          .send(manager)
          .expect(400)
          .end(function (managerSaveErr, managerSaveRes) {
            // Set message assertion
            (managerSaveRes.body.message).should.match('Please fill Manager name');

            // Handle Manager save error
            done(managerSaveErr);
          });
      });
  });

  it('should be able to update an Manager if signed in', function (done) {
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

        // Save a new Manager
        agent.post('/api/managers')
          .send(manager)
          .expect(200)
          .end(function (managerSaveErr, managerSaveRes) {
            // Handle Manager save error
            if (managerSaveErr) {
              return done(managerSaveErr);
            }

            // Update Manager name
            manager.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Manager
            agent.put('/api/managers/' + managerSaveRes.body._id)
              .send(manager)
              .expect(200)
              .end(function (managerUpdateErr, managerUpdateRes) {
                // Handle Manager update error
                if (managerUpdateErr) {
                  return done(managerUpdateErr);
                }

                // Set assertions
                (managerUpdateRes.body._id).should.equal(managerSaveRes.body._id);
                (managerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Managers if not signed in', function (done) {
    // Create new Manager model instance
    var managerObj = new Manager(manager);

    // Save the manager
    managerObj.save(function () {
      // Request Managers
      request(app).get('/api/managers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Manager if not signed in', function (done) {
    // Create new Manager model instance
    var managerObj = new Manager(manager);

    // Save the Manager
    managerObj.save(function () {
      request(app).get('/api/managers/' + managerObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', manager.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Manager with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/managers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Manager is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Manager which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Manager
    request(app).get('/api/managers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Manager with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Manager if signed in', function (done) {
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

        // Save a new Manager
        agent.post('/api/managers')
          .send(manager)
          .expect(200)
          .end(function (managerSaveErr, managerSaveRes) {
            // Handle Manager save error
            if (managerSaveErr) {
              return done(managerSaveErr);
            }

            // Delete an existing Manager
            agent.delete('/api/managers/' + managerSaveRes.body._id)
              .send(manager)
              .expect(200)
              .end(function (managerDeleteErr, managerDeleteRes) {
                // Handle manager error error
                if (managerDeleteErr) {
                  return done(managerDeleteErr);
                }

                // Set assertions
                (managerDeleteRes.body._id).should.equal(managerSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Manager if not signed in', function (done) {
    // Set Manager user
    manager.user = user;

    // Create new Manager model instance
    var managerObj = new Manager(manager);

    // Save the Manager
    managerObj.save(function () {
      // Try deleting Manager
      request(app).delete('/api/managers/' + managerObj._id)
        .expect(403)
        .end(function (managerDeleteErr, managerDeleteRes) {
          // Set message assertion
          (managerDeleteRes.body.message).should.match('User is not authorized');

          // Handle Manager error error
          done(managerDeleteErr);
        });

    });
  });

  it('should be able to get a single Manager that has an orphaned user reference', function (done) {
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

          // Save a new Manager
          agent.post('/api/managers')
            .send(manager)
            .expect(200)
            .end(function (managerSaveErr, managerSaveRes) {
              // Handle Manager save error
              if (managerSaveErr) {
                return done(managerSaveErr);
              }

              // Set assertions on new Manager
              (managerSaveRes.body.name).should.equal(manager.name);
              should.exist(managerSaveRes.body.user);
              should.equal(managerSaveRes.body.user._id, orphanId);

              // force the Manager to have an orphaned user reference
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

                    // Get the Manager
                    agent.get('/api/managers/' + managerSaveRes.body._id)
                      .expect(200)
                      .end(function (managerInfoErr, managerInfoRes) {
                        // Handle Manager error
                        if (managerInfoErr) {
                          return done(managerInfoErr);
                        }

                        // Set assertions
                        (managerInfoRes.body._id).should.equal(managerSaveRes.body._id);
                        (managerInfoRes.body.name).should.equal(manager.name);
                        should.equal(managerInfoRes.body.user, undefined);

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
      Manager.remove().exec(done);
    });
  });
});
