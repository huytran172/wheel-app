angular.module('WheelApp')
  .filter('LabelCase', function () {
    return function (input) {
      if (angular.isUndefined(input)) {
        return;
      }
      input = input.replace(/([A-Z])/g, ' $1');
      return input[0].toUpperCase() + input.slice(1);
    };
  })
  .filter('slice', function () {
    return function (arr, end) {
      return arr.slice(0, end);
    }
  }).filter('range', function ($filter) {
    return function(data, page, size) {
      if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
        var start_index = (page - 1) * size; // get the start index of the current page

        if (start_index > size) { return [] }
        else {
          return $filter('limitTo')(data.slice(start_index), size);
        }
      }
      else {
        return data;
      }
    };
  })
  .filter('pageCount', function () {
    return function (data, pageSize) {
      // Return the number of page and store the page number in array
      if (angular.isArray(data) && angular.isNumber(pageSize)) {
        var results = [],
          i, max;

        for (i = 1, max = Math.ceil(data.length / pageSize); i <= max; i += 1) {
          results.push(i);
        }
        return results;
      }
      else return data;
    }
  });
