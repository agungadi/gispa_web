/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/web/hire_me/hire_me.js ***!
  \****************************************************/


$(document).ready(function () {
  $('#message').summernote({
    placeholder: 'Add Message...',
    minHeight: 200,
    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough']], ['para', ['paragraph']]]
  });
  $('input[type="email"]').on('keyup', function () {
    if ($(this).val() != null) {
      $(this).val($(this).val().toLowerCase());
    }
  });
  $(document).on('submit', '#hireMeForm', function (e) {
    e.preventDefault();

    if (!checkSummerNoteEmpty('#message', 'Message field is required.', 1)) {
      return true;
    }

    var loadingButton = jQuery(this).find('#hireMeSaveBtn');
    loadingButton.button('loading');
    var formData = $(this).serialize();
    $.ajax({
      url: route('hire.request', userName),
      type: 'POST',
      data: formData,
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $('#hireMeModal').modal('hide');
          $('#hireMeTable').DataTable().ajax.reload(null, false);
        }
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  });
  $('#hireMeModal').on('hidden.bs.modal', function () {
    resetModalForm('#hireMeForm', '#validationErrorsBox');
    $('#message').summernote('code', '');
  });
  $(document).on('click', '#createModel', function () {
    $('#hireMeModal').appendTo('body').modal('show');
  });
});
/******/ })()
;