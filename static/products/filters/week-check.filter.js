/* week-check.filter.js */

/**
 * @filter weekCheck
 * @module products
 * @description Checks the date if it in a week range since today, return '1 day ago' and etc.
 */
(function(angular) {
  'use strict';

  angular
    .module('products')
    .filter('weekCheck', weekCheck);

  weekCheck.$inject = [
    '$filter'
  ];

  function weekCheck(
    $filter
  ) {
    return function(value) {
      var MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24,
        WEEK = 7,

        DATE_FORMAT_TYPE = 'short',
        TODAY = 'Today',
        YEST = 'Yesterday',
        DAYS_AGO_TPL = ' days ago';

      var date = new Date(value),
        today = new Date(),
        dateFilter = $filter('date'),
        difference,
        message;

      date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      today = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

      difference = (today - date) / MILLISECONDS_IN_DAY;

      if (difference > WEEK) {
        message = dateFilter(new Date(value), DATE_FORMAT_TYPE);
      } else {
        switch (difference) {
          case 0:
            message = TODAY;
            break;

          case 1:
            message = YEST;
            break;

          default:
            message = difference + DAYS_AGO_TPL;
        }
      }

      return message;
    };
  }

})(angular);
