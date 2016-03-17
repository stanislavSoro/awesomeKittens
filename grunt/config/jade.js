module.exports = {
  development: {
    options: {
      pretty: true,
      data: {
        liveReloadPort: '<%= liveReloadPort %>',
        isDevMode: true
      }
    },
    files: '<%= jadeFiles %>'
  },
  production: {
    options: {
      pretty: false
    },
    files: '<%= jadeFiles %>'
  }
};
