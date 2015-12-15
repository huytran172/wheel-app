angular.module('WheelApp')
  .filter('LabelCase', function () {
    return function (input) {
      if (!angular.isUndefined(input)) {
        input = input.replace(/([A-Z])/g, ' $1');
        return input[0].toUpperCase() + input.slice(1);
      }
      return input;
    };
  });
