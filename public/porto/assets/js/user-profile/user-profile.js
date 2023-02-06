/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************************!*\
  !*** ./resources/assets/js/user-profile/user-profile.js ***!
  \**********************************************************/


$(document).ready(function () {
  if (successMessage !== '') {
    iziToast.success({
      title: '<div class="font-weight-normal">Success</div>',
      message: successMessage,
      iconUrl: iconUrl,
      position: 'topRight'
    });
  }
});
$('#countryId,#stateId,#cityId,#language').select2({
  width: '100%'
});
$('#changeLanguageModal').on('shown.bs.modal', function () {
  $(document).off('focusin.modal');
});
$('.password').on('keypress', function (e) {
  if (e.which == 32) {
    return false;
  }
});
$(document).on('submit', '#changePasswordForm', function (event) {
  event.preventDefault();
  var isValidate = validatePassword();

  if (!isValidate) {
    return false;
  }

  var loadingButton = jQuery(this).find('#btnPrPasswordEditSave');
  loadingButton.button('loading');
  $.ajax({
    url: route('change.password'),
    type: 'post',
    data: new FormData($(this)[0]),
    processData: false,
    contentType: false,
    success: function success(result) {
      if (result.success) {
        $('#changePasswordModal').modal('hide');
        displaySuccessMessage(result.message);
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
$('#changePasswordModal').on('hidden.bs.modal', function () {
  resetModalForm('#changePasswordForm', '#editValidationErrorsBox');
});

function validatePassword() {
  var currentPassword = $('#pfCurrentPassword').val().trim();
  var password = $('#pfNewPassword').val().trim();
  var confirmPassword = $('#pfNewConfirmPassword').val().trim();

  if (currentPassword == '' || password == '' || confirmPassword == '') {
    $('#editPasswordValidationErrorsBox').show().html('Please fill all the required fields.');
    return false;
  }

  return true;
}

$(document).on('click', '.edit-profile', function (event) {
  var id = $(event.currentTarget).attr('data-id');
  renderProfileData(id);
});

window.renderProfileData = function (id) {
  $.ajax({
    url: route('edit-profile', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#pfName').val(result.data.first_name);
        $('#plName').val(result.data.last_name);
        $('#previewImage').attr('src', result.data.profile_image);
        $('#pfEmail').val(result.data.email);
      }
    }
  });
};

$(document).on('change', '#profileImage', function () {
  if (isValidImage($(this), '#validationErrorsBox')) {
    displayImage(this, '#previewImage');
  }

  $('#validationErrorsBox').delay(3000).slideUp(300);
});
$(document).on('submit', '#editProfileForm', function (event) {
  event.preventDefault();
  var loadingButton = jQuery(this).find('#btnPrEditSave');
  loadingButton.button('loading');
  $.ajax({
    url: route('update-profile'),
    type: 'post',
    data: new FormData($(this)[0]),
    processData: false,
    contentType: false,
    success: function success(result) {
      if (result.success) {
        $('#editProfileModal').modal('hide');
        displaySuccessMessage(result.message);
        setTimeout(function () {
          location.reload();
        }, 1500);
      }
    },
    error: function error(result) {
      loadingButton.button('reset');
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      loadingButton.button('reset');
    }
  });
});
$(document).on('submit', '#changeLanguageForm', function (event) {
  event.preventDefault();
  var loadingButton = jQuery(this).find('#btnLanguageChange');
  loadingButton.button('loading');
  $.ajax({
    url: route('update.language'),
    type: 'post',
    data: new FormData($(this)[0]),
    processData: false,
    contentType: false,
    success: function success(result) {
      displaySuccessMessage(result.message);
      setTimeout(function () {
        location.reload();
      }, 3000);
    },
    error: function error(result) {
      manageAjaxErrors(result, 'editProfileValidationErrorsBox');
      loadingButton.button('reset');
    },
    complete: function complete() {
      loadingButton.button('reset');
    }
  });
});
$(document).on('click', '.changeType', function () {
  var inputField = $(this).parent().siblings();
  var oldType = inputField.attr('type');

  if (oldType == 'password') {
    $(this).children().addClass('fa-eye');
    $(this).children().removeClass('fa-eye-slash');
    inputField.attr('type', 'text');
  } else {
    $(this).children().removeClass('fa-eye');
    $(this).children().addClass('fa-eye-slash');
    inputField.attr('type', 'password');
  }
});
/******/ })()
;