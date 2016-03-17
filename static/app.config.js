/* app.config.js */

/**
 * discountWarehouse module configuration
 * @module discountWarehouse
 */
(function(angular) {
  'use strict';

  angular
    .module('discountWarehouse')
    .config(appConfig);

  appConfig.$inject = [
    '$locationProvider'
  ];

  /**
   * @name appConfig
   * @desc Configuration for discountWarehouse module
   * @kind function
   */
  function appConfig(
    $locationProvider
  ) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
})(angular);
