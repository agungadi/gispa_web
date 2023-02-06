/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./resources/assets/js/web/app/app.js ***!
  \********************************************/


$(document).ready(function () {
  $(this).scrollTop(0);
  document.addEventListener('mousemove', parallax);

  function parallax(e) {
    document.querySelectorAll('.profile-bg-img').forEach(function (move) {
      var moving_value = move.getAttribute('data-value');
      var x = e.clientX * moving_value / 200;
      var y = e.clientY * moving_value / 200;
      move.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
    });
  }

  AOS.init();

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
  $(document).on('click', '.badge', function () {
    $(this).addClass('active-badge').siblings().removeClass('active-badge');
  });
  $('#wrapper').on('click', function () {
    $('.icon').toggleClass('close');
    $('.custom_web_sidebar').toggleClass('custom_nav_toggler');
    $(this).toggleClass('wrapper_toggle');
  });
  $('.custom_web_navbar li').on('click', function () {
    $('#wrapper #circle_id').removeClass('close');
    $('#responsive-navbar-nav').toggleClass('custom_nav_toggler');
    $('#wrapper').toggleClass('wrapper_toggle');
  });
  $(document).ready(function () {
    checkSize();
    $(window).resize(checkSize);
  });

  function checkSize() {
    if ($('.side-header').hasClass('custom_nav_toggler')) {
      $('.side-header').removeClass('custom_nav_toggler');
    }

    if ($('#circle_id').hasClass('close')) {
      $('#circle_id').removeClass('close');
    }

    if ($('#wrapper').hasClass('wrapper_toggle')) {
      $('#wrapper').removeClass('wrapper_toggle');
    }
  }

  var btn_top = $('#top_button');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn_top.addClass('show_top_page');
    } else {
      btn_top.removeClass('show_top_page');
    }
  });
  btn_top.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, '500');
  });
});
/******/ })()
;