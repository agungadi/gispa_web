/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/custom/color-picker.js ***!
  \****************************************************/


$(document).ready(function () {
  window.createColorPicker = function () {
    return Pickr.create({
      el: '.color-wrapper',
      theme: 'nano',
      // or 'monolith', or 'nano'
      closeWithKey: 'Enter',
      autoReposition: true,
      defaultRepresentation: 'HEX',
      position: 'bottom-end',
      swatches: ['rgba(244, 67, 54, 1)', 'rgba(233, 30, 99, 1)', 'rgba(156, 39, 176, 1)', 'rgba(103, 58, 183, 1)', 'rgba(63, 81, 181, 1)', 'rgba(33, 150, 243, 1)', 'rgba(3, 169, 244, 1)', 'rgba(0, 188, 212, 1)', 'rgba(0, 150, 136, 1)', 'rgba(76, 175, 80, 1)', 'rgba(139, 195, 74, 1)', 'rgba(205, 220, 57, 1)', 'rgba(255, 235, 59, 1)', 'rgba(255, 193, 7, 1)'],
      components: {
        // Main components
        preview: true,
        hue: true,
        // Input / output Options
        interaction: {
          input: true,
          clear: false,
          save: false
        }
      }
    });
  };

  window.editColorPicker = function () {
    return Pickr.create({
      el: '.edit-color-wrapper',
      theme: 'nano',
      // or 'monolith', or 'nano'
      closeWithKey: 'Enter',
      autoReposition: true,
      defaultRepresentation: 'HEX',
      position: 'bottom-end',
      swatches: ['rgba(244, 67, 54, 1)', 'rgba(233, 30, 99, 1)', 'rgba(156, 39, 176, 1)', 'rgba(103, 58, 183, 1)', 'rgba(63, 81, 181, 1)', 'rgba(33, 150, 243, 1)', 'rgba(3, 169, 244, 1)', 'rgba(0, 188, 212, 1)', 'rgba(0, 150, 136, 1)', 'rgba(76, 175, 80, 1)', 'rgba(139, 195, 74, 1)', 'rgba(205, 220, 57, 1)', 'rgba(255, 235, 59, 1)', 'rgba(255, 193, 7, 1)'],
      components: {
        // Main components
        preview: true,
        hue: true,
        // Input / output Options
        interaction: {
          input: true,
          clear: false,
          save: false
        }
      }
    });
  };
});
/******/ })()
;