'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
    mongoose = require('./mongoose'),
    express = require('./express'),
    chalk = require('chalk'),
    seed = require('./seed');

require('express-jsend');


function seedDB() {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on'));
    seed.start();
  }
}

// Initialize Models
mongoose.loadModels(seedDB);

module.exports.loadModels = function loadModels() {
  mongoose.loadModels();
};

module.exports.init = function init(callback) {
  mongoose.connect(function (db) {
    // Initialize express
    var app = express.init(db);
    if (callback) callback(app, db, config);

  });
};

var checkRoot = require('is-root');
var os = require('os');
module.exports.start = function start(callback) {
  var _this = this;

  var isWin = (os.platform() === 'win32');
  if (!isWin && !checkRoot()) {
    console.log("This app must be run as root\n\n Try with sudo node server.js");
    process.exit(-2);
  }
  _this.init(function (app, db, config) {

    // Start the app by listening on <port>
    app.listen(config.port, function () {

      // Logging initialization
      console.log('\n');
      console.log(chalk.cyan("`7MMM.     ,MMF'     db       .g8'''bgd `7MMF'      `7MM'''YMM "));
      console.log(chalk.cyan("  MMMb    dPMM      ;MM:    .dP'     `M   MM          MM    `7"));
      console.log(chalk.cyan("  M YM   ,M MM     ,V^MM.   dM'       `   MM          MM   d    "));
      console.log(chalk.cyan("  M  Mb  M' MM    ,M  `MM   MM            MM          MMmmMM"));
      console.log(chalk.cyan("  M  YM.P'  MM    AbmmmqMA  MM.    `7MMF' MM      ,   MM   Y  ,"));
      console.log(chalk.cyan("  M  `YM'   MM   A'     VML `Mb.     MM   MM     ,M   MM     ,M"));
      console.log(chalk.cyan(".JML. `'  .JMML.AMA.   .AMMA. `\"bmmmdPY .JMMmmmmMMM .JMMmmmmMMM \n"));
      console.log(chalk.gray("      Modular Adaptive and Gamified Learning Environment"));
      console.log('\n');
      console.log(chalk.yellow('MAGLE Platform\t\t') + chalk.white('0.1.1'));
      console.log(chalk.yellow('Environment:\t\t') + chalk.white(process.env.NODE_ENV));
      console.log(chalk.yellow('\nPort:\t\t\t\t') + chalk.white(config.port));
      console.log(chalk.yellow('Database:\t\t\t') + chalk.white(config.db.uri));
      if (process.env.NODE_ENV === 'secure') {
        console.log(chalk.green('HTTPs:\t\t\t\ton'));
      }
      //console.log(chalk.gray('App version:\t\t' + config.meanjs.version));
      console.log(chalk.green('\n\nYou can access the platform from: ') + chalk.blue.underline('http://localhost:' + config.port + '/'))

      console.log('--');

      if (callback) callback(app, db, config);
    });

  });

};
