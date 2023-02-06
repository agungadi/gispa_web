/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./resources/assets/js/custom/custom-datatable.js ***!
  \********************************************************/


$.extend($.fn.dataTable.defaults, {
  'paging': true,
  'info': true,
  'ordering': true,
  'autoWidth': false,
  'pageLength': 10,
  'language': {
    'search': '',
    'sSearch': 'Search',
    'paginate': {
      'previous': '<i class="fas fa-angle-left"></i>',
      'next': '<i class="fas fa-angle-right"></i>'
    }
  },
  'preDrawCallback': function preDrawCallback() {
    customSearch();
  },
  'fnDrawCallback': function fnDrawCallback(oSettings) {
    $("a.paginate_button[data-dt-idx=\"6\"]").text(commafy(oSettings._iRecordsTotal));
  }
});

function commafy(num) {
  var str = num.toString().split('.');

  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }

  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }

  return str.join('.');
}

function customSearch() {
  $('.dataTables_filter input').addClass('form-control');
  $('.dataTables_filter input').attr('placeholder', 'Search');
}
/******/ })()
;