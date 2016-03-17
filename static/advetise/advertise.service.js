/* advertise.service.js */

/**
 * @name advertiseService
 * @module advertise
 * @desc service to advertise logic, get advertise links, interact with advertise logic
 */
(function(angular) {
  'use strict';

  angular
    .module('advertise')
    .service('advertiseService', advertiseService);

  advertiseService.$inject = [
    'advertiseConstants',
    'appConfig'
  ];

  function advertiseService(
    advertiseConstants,
    appConfig
  ) {
    var shownAds = {},

      api = {
        getAdvertiseLink: getAdvertiseLink,
        generateAdIndex: generateAdIndex
      };

    return api;
    /////////////////////

    /**
     * @name getAdvertiseLink
     * @desc returns the link to the advertise
     * @kind function
     * @returns {string} link to get the advertise img 
     */
    function getAdvertiseLink() {
      return appConfig.api + '/ad/?r=' + generateAdIndex();
    }

    /**
     * @name generateAdIndex
     * @desc returns the link to the advertise
     * @kind function
     * @returns {number} not shown advertisement number 
     */
    function generateAdIndex() {
      var generatedIndex;
      do {
        generatedIndex = Math.floor(Math.random() * advertiseConstants.max);
      } while (shownAds[generatedIndex]);

      setShownAd(generatedIndex);

      return generatedIndex;
    }

    /**
     * @name setShownAd
     * @desc add shown advertisment to the showAds object
     * @kind function
     * @param {Number} index of used ad
     */
    function setShownAd(adIndex) {
      shownAds[adIndex] = true;
    }
  }

})(angular);
