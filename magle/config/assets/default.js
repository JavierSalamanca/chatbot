'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-bootstrap/ui-bootstrap-csp.css',
        'public/lib/angular-tree-control/css/tree-control.css',
        'public/lib/angular-tree-control/css/tree-control-attribute.css',
        'public/lib/json-form/dist/json-form.css',
        'public/lib/angular-ui-router-anim-in-out/css/anim-in-out.css',
        'public/lib/angular-promise-buttons/example/style.css'

      ],
      js: [
        'public/lib/angular/angular.js',
        /* 'public/lib/angular-translate/angular-translate.js',
         'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js', */
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/angular-tree-control/angular-tree-control.js',
        'public/lib/angular-strap/dist/angular-strap.js',
        'public/lib/angular-strap/dist/angular-strap.tpl.js',
        'public/lib/json-form/dist/json-form.js',
        'public/lib/angular-ui-router-anim-in-out/anim-in-out.js',
        'public/lib/angular-promise-buttons/dist/angular-promise-buttons.min.js',


        //ngStrap


        // Fancytree
        'public/thirdlib/jquery.min.js',
        'public/thirdlib/jquery-ui.min.js',
        'public/thirdlib/jquery.fancytree.min.js',
        'public/lib/angular-fancytree/dist/angular-fancytree.js',

        // API
        'public/wrapper/api.js',

        // Angular plotly
        'public/thirdlib/plotly/plotly-latest.min.js',
        'public/lib/angular-plotly/src/angular-plotly.js',

        'public/lib/angular-breadcrumb/dist/angular-breadcrumb.min.js',   // Breadcrumb
        'public/wrapper/gameAPI.js'                                       // Game API


      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
