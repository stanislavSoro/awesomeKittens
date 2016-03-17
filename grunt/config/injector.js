module.exports = {
  options: {
    template: 'dist/index.html',
    ignorePath: ['static', 'source']
  },
  localDependencies: {
    files: {
      'dist/index.html': [
        'static/app.module.js',
        'static/app.config.js',
        'static/app.constant.js',
        'static/**/*.module.js',
        'static/**/*.js',
        '!static/assets/**/*.*'
      ]
    }
  },
  bowerWithPrefix: {
    options: {
      bowerPrefix: 'bower:'
    },
    files: {
      'dist/index.html': ['bower.json']
    }
  }
};
