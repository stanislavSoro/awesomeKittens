module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('prod', function() {
    grunt.task.run(
      'jshint',
      'clean',
      'copy:production',
      'jade:production',
      'sass',
      'html2js',
      'bower_concat',
      'concat',
      'json-minify',
      'cssmin',
      'uglify',
      'clean:temp',
      'compress'
    );
  });
};
