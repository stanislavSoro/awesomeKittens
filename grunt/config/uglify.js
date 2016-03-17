module.exports = {
  application: {
  	options: {
  		mangle: false
  	},
    files: [{
      'dist/js/app.min.js': 'dist/temp/js/app.js'
    }]
  }
};
