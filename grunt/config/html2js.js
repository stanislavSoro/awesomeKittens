module.exports = {
  main: {
    options: {
      rename: function(moduleName) {
        return moduleName.replace('.jade', '.html');
      }
    },
    src: 'static/**/*.jade',
    dest: '<%= destDir %>' + '/tmp/templates.js'
  }
};
