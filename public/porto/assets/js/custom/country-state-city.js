/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************************!*\
  !*** ./resources/assets/js/custom/country-state-city.js ***!
  \**********************************************************/


$(document).ready(function () {
  $('#countryId').on('change', function () {
    $.ajax({
      url: route('states-list'),
      type: 'get',
      dataType: 'json',
      data: {
        postal: $(this).val()
      },
      success: function success(data) {
        $('#stateId').empty();
        $('#stateId').append($('<option value="" selected="selected"></option>').text(selectState));
        $.each(data.data, function (i, v) {
          $('#stateId').append($('<option></option>').attr('value', i).text(v));
        }); // if (edit && stateId) {
        //     setTimeout(function () {
        //         $('#stateId').val(stateId).trigger('change');
        //     }, 300);
        // }
      }
    });
  });
  $('#stateId').on('change', function () {
    $.ajax({
      url: route('cities-list'),
      type: 'get',
      dataType: 'json',
      data: {
        state: $(this).val(),
        country: $('#countryId').val()
      },
      success: function success(data) {
        $('#cityId').empty();
        $('#cityId').append($('<option value="" selected="selected"></option>').text(selectCity));
        $.each(data.data, function (i, v) {
          $('#cityId').append($('<option ></option>').attr('value', i).text(v));
        }); // if (edit && cityId) {
        //     setTimeout(function () {
        //         $('#cityId').val(cityId).trigger('change');
        //     }, 500);
        // }
      }
    });
  }); // if (edit && countryId) {
  //     $('#countryId').val(countryId).trigger('change');
  // }
});
/******/ })()
;