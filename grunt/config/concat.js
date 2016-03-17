module.exports = {
  options: {
    separator: ';'
  },
  application: {
    src: [
      'dist/temp/_bower.js',
      'dist/tmp/templates.js',
      'static/app.module.js',
      'static/app.config.js',
      'static/app.constant.js',
      'static/**/*.module.js',
      'static/**/*.js',

      '!static/**/vendors/**/*.js'
    ],
    dest: 'dist/temp/js/app.js'
  },
  styles: {
    src: [
      'dist/temp/*.css',
      'dist/stylesheets/styles.css',
    ],
    dest: 'dist/stylesheets/styles.css'
  }
};
