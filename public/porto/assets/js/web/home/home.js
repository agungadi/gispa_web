/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/web/home/home.js ***!
  \**********************************************/


$(document).ready(function () {
  //  While click the show more button then display the all skills
  var showMoreSkill = false;
  $('.show-more-skills').hide();
  $('.show-more-link-skill').on('click', function () {
    if (showMoreSkill) {
      $(this).text('').text('Show More');
      showMoreSkill = false;
    } else {
      showMoreSkill = true;
      $(this).text('').text('Show Less');
    }

    $('.show-more-skills').slideToggle(200);
  }); // While click the show more button of services then show all services 

  var showMoreServices = false;
  $('.show-more-link-services').on('click', function () {
    $('.show-more-services').slideToggle(200);

    if (showMoreServices) {
      $(this).text('').text('Show More');
      showMoreServices = false;
    } else {
      showMoreServices = true;
      $(this).text('').text('Show Less');
    }
  }); //While click the about me button then display the all about me blocks 

  var showMoreAboutMe = false;
  $('.show-more-link-about-me').on('click', function () {
    $('.show-about-me').slideToggle(200);

    if (showMoreAboutMe) {
      $(this).text('').text('Show More');
      showMoreAboutMe = false;
    } else {
      showMoreAboutMe = true;
      $(this).text('').text('Show Less');
    }
  }); //While click the education tab then display the education block

  $('#educationDetails').on('click', function () {
    var showMoreEducation = false;

    if (!showMoreEducation) {
      $('.education-block').show();
    } else {
      $('.education-block').hide();
    }
  }); //Selected by default active link and show the active link data while click the other tab then display the recent works block 

  $(document).on('click', '.recent-work-field', function () {
    $('span').removeClass('active');
  });
  $('.recent-work-details.active').parent().click(); //Active header link while scrolling the mouse

  var sections = document.querySelectorAll('section');
  var navLi = document.querySelectorAll('nav .side-header  ul li');
  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 8) {
        current = section.getAttribute('id');
      }
    });
    navLi.forEach(function (li) {
      li.classList.remove('nav-active');

      if (li.classList.contains(current)) {
        li.classList.add('nav-active');
      }
    });
  }); //Skill_blade - javascript

  jQuery(document).ready(function () {
    var el;
    var options;
    var canvas;
    var span;
    var ctx;
    var radius;

    var createCanvasVariable = function createCanvasVariable(id) {
      // get canvas
      el = document.getElementById(id);
    };

    var createAllVariables = function createAllVariables() {
      options = {
        percent: el.getAttribute('data-percent') || 25,
        size: el.getAttribute('data-size') || 165,
        lineWidth: el.getAttribute('data-line') || 8,
        rotate: el.getAttribute('data-rotate') || 0,
        color: el.getAttribute('data-color')
      };
      canvas = document.createElement('canvas');
      span = document.createElement('span');
      span.textContent = options.percent + '%';

      if (typeof G_vmlCanvasManager !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
      }

      ctx = canvas.getContext('2d');
      canvas.width = canvas.height = options.size;
      el.appendChild(span);
      el.appendChild(canvas);
      ctx.translate(options.size / 2, options.size / 2); // change center

      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

      radius = (options.size - options.lineWidth) / 2;
    };

    var drawCircle = function drawCircle(color, lineWidth, percent) {
      percent = Math.min(Math.max(0, percent || 1), 1);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
      ctx.strokeStyle = color;
      ctx.lineCap = 'square'; // butt, round or square

      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    var drawNewGraph = function drawNewGraph(id) {
      el = document.getElementById(id);
      createAllVariables();
      drawCircle('#D3D3D6', options.lineWidth, 100 / 100);
      drawCircle(options.color, options.lineWidth, options.percent / 100);
    };

    var index = 1;

    for (index; index <= totalSkills; index++) {
      drawNewGraph('graph' + index);
    }
  }); // let numberFormat = new Intl.NumberFormat('en', {
  //     // style: 'currency',
  //     // currency: 'USD',
  // });
  // let formattedData = '';
  // $('.main-card__price').each(function () {
  //     let price = $(this).text();
  //      formattedData =  numberFormat.format(price);
  //     return $(this).text(formattedData);
  //    
  // });
});
/******/ })()
;