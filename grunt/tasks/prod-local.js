module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('prod-local', function(projectName) {
    grunt.task.run(
      'prod',
      'connect',
      'open:build',
      'watch'
    );
  });
};
