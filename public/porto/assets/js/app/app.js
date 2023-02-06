/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./resources/assets/js/app/app.js ***!
  \****************************************/


$(document).ready(function () {
  (function ($) {
    $.fn.button = function (action) {
      if (action === 'loading' && this.data('loading-text')) {
        this.data('original-text', this.html()).html(this.data('loading-text')).prop('disabled', true);
      }

      if (action === 'reset' && this.data('original-text')) {
        this.html(this.data('original-text')).prop('disabled', false);
      }
    };

    $('#overlay-screen-lock').hide();
  })(jQuery);

  $(document).ready(function () {
    $('.alert').delay(5000).slideUp(300);
  });
  $(document).ready(function () {
    $('.admin_menu_icon').on('click', function () {
      $('.sidenav').toggleClass('hide_toggle');
      $(this).toggleClass('small-line-active');
    });
    $('.close_icon').on('click', function () {
      $('.sidenav').toggleClass('hide_toggle');
      $('.admin_menu_icon').toggleClass('small-line-active');
    });
    $('.desktop_admin_menu_icon').on('click', function () {
      $('.sidenav').toggleClass('desktop_hide_toggle');
      $('.main-content').toggleClass('desktop_content');
      $('.main-content').toggleClass('desktop_main_content');
      $('.custom_disabled_span').toggleClass('text_display');
      $('.custom_disabled_span').toggleClass('custom_image_padding');
      $('.custom-sidebar-logo').toggleClass('custom_image_padding');
      $('.sidebar-dropdown').toggleClass('ul-dropdown');
      $('.custom_pl').toggleClass('custom_podding_left');
      $('.ul-dropdown').addClass('show');
      $('.ul-dropdown').prev().addClass('collapsed');
      $('.ul-dropdown').prev().attr('aria-expanded', 'false');
      $('.big_size_icon').toggleClass('big_sidebar_icon');
      $(this).toggleClass('small-line-active');

      if ($('.ul-dropdown').hasClass('show')) {
        $('.ul-dropdown').removeClass('show');
      }
    });
    $(document).ready(function () {
      checkAdminSize();
      $(window).resize(checkAdminSize);
    });

    function checkAdminSize() {
      if ($('.ul-dropdown').hasClass('show')) {
        $('.ul-dropdown').removeClass('show');
        $('.ul-dropdown').prev().addClass('collapsed');
        $('.ul-dropdown').prev().attr('aria-expanded', 'false');
      }
    }
  });
});
/******/ })()
;