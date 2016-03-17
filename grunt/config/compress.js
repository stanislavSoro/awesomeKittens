module.exports = {
  main: {
    options: {
      mode: 'gzip',
      level: 9
    },
    files: [{
      expand: true,
      src: ['dist/**/*.html'],
      ext: '.html.gz'
    }, {
      expand: true,
      src: ['dist/**/*.css'],
      ext: '.css.gz'
    }, {
      expand: true,
      src: ['dist/js/app.min.js'],
      ext: '.min.js.gz'
    }, {
      expand: true,
      src: ['dist/**/*.json'],
      ext: '.json.gz'
    }, {
      expand: true,
      src: ['dist/**/*.otf'],
      ext: '.otf.gz'
    }, {
      expand: true,
      src: ['dist/**/*.svg'],
      ext: '.svg.gz'
    }, {
      expand: true,
      src: ['dist/**/*.woff'],
      ext: '.woff.gz'
    }, {
      expand: true,
      src: ['dist/**/*.woff2'],
      ext: '.woff2.gz'
    }, {
      expand: true,
      src: ['dist/**/*.eot'],
      ext: '.eot.gz'
    }, {
      expand: true,
      src: ['dist/**/*.ttf'],
      ext: '.ttf.gz'
    }]
  }
};
