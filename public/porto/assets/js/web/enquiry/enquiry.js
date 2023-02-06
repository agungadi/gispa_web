/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/web/enquiry/enquiry.js ***!
  \****************************************************/


$(document).ready(function () {
  $(document).on('focusout', '#phoneNumber', function () {
    var errorMsg = $(this).attr('data-content');
    $('#error-msg').text('');

    if (typeof errorMsg !== 'undefined' && errorMsg !== false) {
      $('#error-msg').removeClass('hide').append(errorMsg);
      $(this).focus();
    }
  });
  $(document).on('submit', '#sendEnquiryForm', function (e) {
    e.preventDefault();
    var errorMsg = $('#phoneNumber').attr('data-content');
    $('#error-msg').text('');

    if (typeof errorMsg !== 'undefined' && errorMsg !== false) {
      $('#error-msg').removeClass('hide').append(errorMsg);
      $('#phoneNumber').focus();
      return false;
    } // if ($('#error-msg').text() !== '') {
    //     $('#phoneNumber').focus();
    //     return false;
    // }


    var loadingButton = jQuery(this).find('#enquiryBtn');
    loadingButton.button('loading');
    $.ajax({
      url: route('send.enquiry', userName),
      type: 'POST',
      data: $(this).serialize(),
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          setTimeout(function () {
            location.reload();
          }, 400);
        }
      },
      error: function error(result) {
        grecaptcha.reset();
        displayErrorMessage(result.responseJSON.message);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  });
});
/******/ })()
;