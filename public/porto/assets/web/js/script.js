/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./resources/assets/web/js/script.js ***!
  \*******************************************/


window.onunload = function () {
  window.scrollTo(0, 0);
};

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

$(document).on('click', 'ul li', function () {
  $(this).addClass('nav-active').siblings().removeClass('nav-active');
});
$('.all-details__block span').on('click', function () {
  $('.all-details__block span.active-details').removeClass('active-details');
  $(this).addClass('active-details');
});
$(document).on('click', 'nav a', function () {
  $(this).addClass('active').siblings().removeClass('active');
}); //for testimonial , slider

$('.testimonial__sliders').slick({
  autoplay: true,
  autoplaySpeed: 1500,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
  }]
}); //for recent work section

$(document).on('click', '.recent-work-field', function (event) {
  var field = $(event.currentTarget).attr('data-field');
  openFiled(event, field);
});

function openFiled(evt, field) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  tablinks = document.getElementsByClassName('tablinks');

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(field).style.display = 'block';
  evt.currentTarget.className += ' active';
}

$(document).ready(function () {
  if (localStorage.getItem('dark-theme') == 'on') {
    $('body').addClass('dark-theme');
    $('.light-mode-icon').addClass('d-none');
    $('.dark-mode-icon').removeClass('d-none');
    $('#darkThemeBadge').addClass('active-badge');
    $('#lightThemeBadge').removeClass('active-badge');
  }
}); // //toggle of light theme

$(document).on('click', '#lightThemeBadge', function (e) {
  $('.light-mode-icon').removeClass('d-none');
  $('.dark-mode-icon').addClass('d-none');
  $('body').removeClass('dark-theme');
  $(this).addClass('active-badge');
  localStorage.removeItem('dark-theme');
}); // //toggle of dark theme

$(document).on('click', '#darkThemeBadge', function (e) {
  $('body').addClass('dark-theme');
  $('.light-mode-icon').addClass('d-none');
  $('.dark-mode-icon').removeClass('d-none');
  $(this).addClass('active-badge');
  localStorage.setItem('dark-theme', 'on');
});
/******/ })()
;