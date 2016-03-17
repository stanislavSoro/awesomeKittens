/* products.route.js */

/**
 * products route
 * @module discountWarehouse
 * @desc products route configuration
 */
(function(angular) {
  'use strict';

  angular
    .module('discountWarehouse')
    .config(routeConfig);

  routeConfig.$inject = [
    '$stateProvider'
  ];

  /**
   * @name routeConfig
   * @desc Route configuration for products
   * @kind function
   */
  function routeConfig(
    $stateProvider
  ) {
    $stateProvider
      .state('products', {
        url: '/',
        templateUrl: '../static/products/list/list.tpl.html',
        controller: 'ProductsListCtrl',
        controllerAs: 'vm'
      });
  }
})(angular);
