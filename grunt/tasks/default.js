module.exports = function(grunt) {
  'use strict';
  
  grunt.registerTask('default', function() {
    console.log('select environment please:');
    console.log('grunt dev - to run dev build');
    console.log('grunt prod - to run prod build');
    console.log('grunt prod-local - to run production build on the local machine with server');
  });
};
