'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    owaspPasswordStrengthTest.config({
      allowPassphrases       : true,
      maxLength              : 128,
      minLength              : 6,
      minPhraseLength        : 6,
      minOptionalTestsToPass : 3,
    });

    return {
      getResult: function (password) {
        debugger;
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        debugger;

        var popoverMsg = 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.';
        return popoverMsg;
      }
    };
  }
]);
