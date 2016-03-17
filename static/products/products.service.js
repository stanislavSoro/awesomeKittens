/* products.service.js */

/**
 * @name productsService
 * @module products
 * @desc service to get, handle products
 */
(function(angular, oboe) {
  'use strict';

  angular
    .module('products')
    .service('productsService', productsService);

  productsService.$inject = [
    '$q',
    '$http',
    '$httpParamSerializer',
    'appConfig'
  ];

  function productsService(
    $q,
    $http,
    $httpParamSerializer,
    appConfig
  ) {
    var shownAds = {},

      api = {
        getProductsList: getProductsList
      };

    return api;
    /////////////////////

    /**
     * @name getProductsList
     * @desc returns product list
     * @kind function
     * @param {Object} query params for getting products list
     * - **limit** – `{number}` – limit of items | REQUIRED
     * - **skip** – `{number}` – for pagination, amount of elements to skip
     * - **sort** – `{string}` – sort by 'price' || 'size' || 'id'.
     * @returns {Promise} when session ends return array
     */
    function getProductsList(queryParams) {
      var deferred = $q.defer(),
        url = appConfig.api + '/api/products?' + $httpParamSerializer(queryParams),
        products = [],
        itemsReceived = 0,
        oboeStream;

      oboeStream = oboe({
          url: url
        })
        .done(function(data) {
          products.push(data);
          ++itemsReceived;
          if (itemsReceived === queryParams.limit) {
            deferred.resolve(products);
          }
        });

      //clear stream if the callback unnecessary
      deferred.promise._httpTimeout = function() {
        oboeStream.abort();
      };

      return deferred.promise;
    }
  }

})(angular, oboe);
