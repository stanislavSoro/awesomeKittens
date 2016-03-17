/* app.module.js */

/**
 * discountWarehouse module init
 * @module discountWarehouse
 */
(function(angular) {
  'use strict';

  angular
    .module('discountWarehouse', [
    	'ui.router',
      'templates-main',
      'advertise',
    	'products'
    ]);
})(angular);
