module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('dev', function(projectName) {
    grunt.task.run(
      'clean',
      'copy:development',
      'jade:development',
      'injector',
      'html2js',
      'sass',
      'connect',
      'open:build',
      'watch'
    );
  });
};
