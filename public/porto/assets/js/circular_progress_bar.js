/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./resources/js/circular_progress_bar.js ***!
  \***********************************************/


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

setTimeout(function () {
  $('div[class*="pie-progress-"]').each(function () {
    new CircularProgressBar({
      percent: $(this).attr('data-percent'),
      pie: $(this).attr('class'),
      color: '#db4c83',
      fontSize: '1.2rem',
      size: 200,
      name: $(this).attr('data-name')
    });
  });
}, 500);

var CircularProgressBar = /*#__PURE__*/function () {
  function CircularProgressBar(options) {
    _classCallCheck(this, CircularProgressBar);

    this.options = options;
    var _this$options = this.options,
        pie = _this$options.pie,
        percent = _this$options.percent,
        color = _this$options.color,
        strokeWidth = _this$options.strokeWidth,
        opacity = _this$options.opacity,
        number = _this$options.number,
        size = _this$options.size,
        fontSize = _this$options.fontSize,
        fontWeight = _this$options.fontWeight,
        fontColor = _this$options.fontColor,
        name = _this$options.name;
    this.pie = pie;
    this.pieElement = document.querySelector(".".concat(pie));
    this.percent = percent || 65;
    this.name = name;
    this.color = color || '#00a1ff';
    this.strokeWidth = strokeWidth || 6;
    this.opacity = opacity || 0.07;
    this.number = number || true;
    this.size = size || 100;
    this.fontSize = fontSize || '3rem';
    this.fontWeight = fontWeight || 500;
    this.fontColor = fontColor || '#365b74';
    this.end = 264;
    this.createSvg();
  }

  _createClass(CircularProgressBar, [{
    key: "hexTorgb",
    value: function hexTorgb(fullhex) {
      var hex = fullhex.substring(1, 7);
      var rgb = "".concat(parseInt(hex.substring(0, 2), 16), ", ").concat(parseInt(hex.substring(2, 4), 16), ",").concat(parseInt(hex.substring(4, 6), 16));
      return rgb;
    }
  }, {
    key: "circularProgressBar",
    value: function circularProgressBar() {
      var _this = this;

      var stroke = document.querySelector(".".concat(this.pie, "-stroke"));
      this.percentElement();

      var _loop = function _loop(i) {
        setTimeout(function () {
          if (i == parseInt(_this.percent)) {
            _this.percentElementUpdate(_this.percent);

            return;
          }

          if (i > _this.percent) return;

          if (_this.number) {
            _this.percentElementUpdate(i);
          }

          var d = parseInt(i * 2.64);
          stroke.setAttribute('style', "fill: transparent; stroke: ".concat(_this.color, "; stroke-width: ").concat(_this.strokeWidth, "; stroke-dashoffset: 66; stroke-dasharray: ").concat(d, " ").concat(_this.end - d));
        }, i * 15);
      };

      for (var i = 0; i <= this.end; i++) {
        _loop(i);
      }

      this.pieElement.setAttribute('style', "position: relative; border-radius: 50%; width: ".concat(this.size, "px; height: ").concat(this.size, "px; box-shadow: inset 0px 0px ").concat(this.strokeWidth, "px ").concat(this.strokeWidth, "px rgba(").concat(this.hexTorgb(this.color), ", ").concat(this.opacity, ")"));
    }
  }, {
    key: "percentElement",
    value: function percentElement() {
      var percent = document.createElement('div');
      percent.className = 'percent';
      percent.setAttribute('style', "position: absolute; left: 50%; top: 50%;transform: translate(-50%, -50%); font-size: ".concat(this.fontSize, "; font-weight: ").concat(this.fontWeight, "; color: ").concat(this.fontColor));
      this.pieElement.appendChild(percent);
    }
  }, {
    key: "percentElementUpdate",
    value: function percentElementUpdate(numbers) {
      var percentNumber = document.querySelector(".".concat(this.pie, " > .percent"));
      percentNumber.innerHTML = "<span class=\"skill_name\">".concat(this.name, "</span><span class=\"skill_percent\">").concat(numbers, "%</span>");
    }
  }, {
    key: "createSvg",
    value: function createSvg() {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      svg.setAttribute('width', this.size);
      svg.setAttribute('height', this.size);
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
      circle.setAttribute('cx', 50);
      circle.setAttribute('cy', 50);
      circle.setAttribute('r', 42);
      circle.setAttribute('class', "".concat(this.pie, "-stroke"));
      svg.appendChild(circle);
      this.pieElement.appendChild(svg);
      this.circularProgressBar();
    }
  }]);

  return CircularProgressBar;
}();
/******/ })()
;