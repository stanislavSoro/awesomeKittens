module.exports = {
  css: {
    files: 'static/assets/stylesheets/**/*.scss',
    tasks: ['sass'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  index: {
    files: 'static/index.jade',
    tasks: ['jade:development', 'injector'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  tpl: {
    files: ['static/**/*.jade'],
    tasks: ['html2js'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  js: {
    files: 'static/**/*.js',
    tasks: ['copy', 'injector'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  static: {
    files: ['static/assets/**/images/**'],
    tasks: ['copy', 'injector'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  }
};
