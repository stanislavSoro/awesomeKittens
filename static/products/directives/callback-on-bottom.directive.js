/* callback-on-bottom.directive.js */

/**
 * @directive callbackOnBottom
 * @module products
 * @description Checks the date if it in a week range since today, return '1 day ago' and etc.
 * @example 
 */
(function(angular, empty) {
  'use strict';

  angular
    .module('products')
    .directive('callbackOnBottom', callbackOnBottom);

  callbackOnBottom.$inject = [];

  function callbackOnBottom() {
    var directive = {
      restrict: 'A',
      scope: {
        callbackOnBottom: '='
      },
      link: link
    };

    return directive;
    //////////////////

    function link(scope, element, attrs) {
      var INTERVAL_SCROLL_CHECK = 300,
        REDUCED_BOTTOM_LEVEL = 100;

      var callbackHandler = scope.callbackOnBottom,
        mainElement,
        target,
        scrollPosition,
        intervalScrollCheck,
        previousScrollPosition,
        isActive;

      mainElement = document.body;
      target = element[0];

      scope.$on('$destroy', function() {
        _stopHandler();
      });

      _startHandler();

      callbackHandler._stopHandler = _stopHandler;
      callbackHandler._startHandler = _startHandler;

      ////////////////

      /**
       * @name checkScrollPosition
       * @desc Function for checking scroll position
       * @kind function
       */
      function checkScrollPosition() {
        scrollPosition = mainElement.scrollTop;
        if (previousScrollPosition) { // if we have previous scroll value
          if (previousScrollPosition >= scrollPosition) { // checks if the scroll on the same position or user scrolls up clears interval
            previousScrollPosition = scrollPosition;
            cleanScrollCheckInterval(); // clears interval
            return;
          }
        }

        previousScrollPosition = scrollPosition;

        if (scrollPosition + document.documentElement.clientHeight >= mainElement.offsetHeight - REDUCED_BOTTOM_LEVEL) {
          clearInterval(intervalScrollCheck);
          previousScrollPosition = empty;
          if (scope.callbackOnBottom && scope.callbackOnBottom.callback) {
            scope.callbackOnBottom
              .callback()
              .then(function() {
                document.addEventListener('scroll', startScrollCheckInterval);
              });

            scope.$apply();
          }
        }
      }

      /**
       * @name scrollCheckHandler
       * @desc handler for the scroll
       * @kind function
       */
      function scrollCheckHandler() {
        startScrollCheckInterval();
      }

      /**
       * @name startScrollCheckInterval
       * @desc starts interval to check scroll position, clears scroll event
       * @kind function
       */
      function startScrollCheckInterval() {
        intervalScrollCheck = setInterval(function() {
          checkScrollPosition();
        }, INTERVAL_SCROLL_CHECK);
        document.removeEventListener('scroll', startScrollCheckInterval);
      }

      /**
       * @name cleanScrollCheckInterval
       * @desc clears interval and add event on scroll
       * @kind function
       */
      function cleanScrollCheckInterval() {
        clearInterval(intervalScrollCheck);
        document.addEventListener('scroll', startScrollCheckInterval);
      }

      /**
       * @name _stopHandler
       * @desc stops handler logic
       * @kind function
       */
      function _stopHandler() {
        if (!isActive) return;
        isActive = false;
        clearInterval(intervalScrollCheck);
        document.removeEventListener('scroll', startScrollCheckInterval);
      }

      /**
       * @name _startHandler
       * @desc starts handler logic
       * @kind function
       */
      function _startHandler() {
        if (isActive) return;
        isActive = true;
        document.addEventListener('scroll', startScrollCheckInterval);
      }
    }

  }

})(angular);
