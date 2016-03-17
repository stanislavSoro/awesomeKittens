/*******************************

  Grunt task init

*********************************/
module.exports = function(grunt) {
  'use strict';

  var sourceDir = 'static',
    destDir = 'dist',
    liveReloadPort = 35729,
    path = require('path'),

    jadeFiles = [{
      cwd: sourceDir,
      src: 'index.jade',
      dest: destDir,
      expand: true,
      flatten: true,
      ext: '.html'
    }],

    defaultCopyFiles = [{
      expand: true,
      cwd: sourceDir,
      src: ['assets/images/**'],
      dest: destDir
    }, {
      expand: true,
      cwd: sourceDir,
      src: ['assets/fonts/**'],
      dest: destDir
    }, {
      expand: true,
      cwd: sourceDir,
      flatten: true,
      src: [
        'assets/vendors/font-awesome/fonts/*',
      ],
      dest: destDir + '/fonts'
    }, ],

    developmentCopyFiles = defaultCopyFiles.concat({
      expand: true,
      cwd: sourceDir,
      src: [
        '**/*.js',
        'assets/vendors/**/*.*'
      ],
      dest: destDir
    });

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {
      sourceDir: sourceDir,
      jadeFiles: jadeFiles,
      destDir: destDir,
      defaultCopyFiles: defaultCopyFiles,
      developmentCopyFiles: developmentCopyFiles,
      liveReloadPort: liveReloadPort
    }
  });
};
