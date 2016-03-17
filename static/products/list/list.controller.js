/* list.controller.js */

/**
 * Products list controller
 * @name ProductsListCtrl
 * @module products
 * @desc Products list controller
 */
(function(angular, empty) {
  'use strict';

  angular
    .module('products')
    .controller('ProductsListCtrl', ProductsListCtrl);

  ProductsListCtrl.$inject = [
    '$q',
    'advertiseService',
    'productsService'
  ];

  function ProductsListCtrl(
    $q,
    advertiseService,
    productsService
  ) {
    var vm = this,
      itemsLimitPerLoad = 40,
      showAdAfterElementIndex = 20,
      loadedItemsAmount = 0,
      sortKeysList = [
        'price',
        'size',
        'id'
      ],
      cachedItems = [],
      activeLoading;

    //data model
    vm.model = {
      sponsorAd: getAdLink(),
      productsList: [],
      showAdAfterElementIndex: showAdAfterElementIndex,
      sortKey: sortKeysList[0],
      sortKeysList: sortKeysList,
      endOfCatalogue: false,
      productsLoading: false
    };

    vm.actions = {
      getAdLink: getAdLink,
      getProducts: getProducts,
      onChangeSortKey: onChangeSortKey
    };

    vm.handlers = {
      callbackOnBottomHandler: {
        callback: callbackOnBottomHandler
      }
    };

    init();

    /**
     * @name init
     * @desc Function for start of controller logic
     * @kind function
     */
    function init() {
      getProducts(addItemsToTheDataModelCallback, true);
    }

    /**
     * @name getAdLink
     * @desc get ad link
     * @kind function
     * @returns {String} add link
     */
    function getAdLink() {
      var link = advertiseService.getAdvertiseLink();
      return link;
    }

    /**
     * @name getProducts
     * @desc get Products
     * @kind function
     * @param {function} callback function for handling items
     * @param {boolean} show loader value
     * @returns {Promise | undefined}
     */
    function getProducts(callback, showLoader, _isCache) {
      if (vm.model.endOfCatalogue) return;

      if (activeLoading && activeLoading._httpTimeout) {
        activeLoading._httpTimeout();
      }

      vm.model.productsLoading = showLoader;

      activeLoading = productsService
        .getProductsList({
          limit: itemsLimitPerLoad,
          skip: loadedItemsAmount,
          sort: vm.model.sortKey
        });

      if (_isCache) {
        activeLoading._isCache = _isCache;
      }

      activeLoading
        .then(function(data) {
          activeLoading = empty;
          loadedItemsAmount += itemsLimitPerLoad;
          return data;
        })
        .then(callback);

      return activeLoading;
    }

    /**
     * @name addItemsToTheDataModelCallback
     * @desc add items to the data model
     * @kind function
     * @param {Array} array of items
     */
    function addItemsToTheDataModelCallback(data) {
      if (data.length < itemsLimitPerLoad) {
        vm.model.endOfCatalogue = true;
        vm.handlers.callbackOnBottomHandler._stopHandler();
      } else {
        cacheItems();
      }
      vm.model.productsLoading = false;
      vm.model.productsList = vm.model.productsList.concat(data);
    }

    /**
     * @name onChangeSortKey
     * @desc handler on change sort key
     * @kind function
     */
    function onChangeSortKey() {
      cachedItems = [];
      clearProducts();
      getProducts(addItemsToTheDataModelCallback, true)
        .then(function() {
          vm.handlers.callbackOnBottomHandler._startHandler();
        });
    }

    /**
     * @name clearProducts
     * @desc remove all products, update loaded items amount
     * @kind function
     */
    function clearProducts() {
      loadedItemsAmount = 0;
      vm.model.endOfCatalogue = false;
      vm.model.productsLoading = false;
      vm.model.productsList = [];
    }

    /**
     * @name callbackOnBottomHandler
     * @desc callback when user reaches the end of document
     * @kind function
     * @returns {Promise}
     */
    function callbackOnBottomHandler() {
      var deferred = $q.defer();

      if (activeLoading) {
        vm.model.productsLoading = true;

        if (activeLoading._isCache) {
          return activeLoading
            .then(addItemsToTheDataModelCallback);
        } else {
          return activeLoading;
        }
      }

      if (cachedItems.length > 0) {
        addItemsToTheDataModelCallback(cachedItems);
        cachedItems = [];
        deferred.resolve();

        return deferred.promise;
      }
      return getProducts(addItemsToTheDataModelCallback, true);
    }

    /**
     * @name cacheCallback
     * @desc callback when data is downloaded for cache
     * @kind function
     * @param {Array} array of items
     * @returns {Array} array of items
     */
    function cacheCallback(data) {
      cachedItems = data;
      return data;
    }

    /**
     * @name cacheItems
     * @desc cache items function
     * @kind function
     * @return {Promise}
     */
    function cacheItems() {
      return getProducts(cacheCallback, undefined, true);
    }
  }

})(angular);
