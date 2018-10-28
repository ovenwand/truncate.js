(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TruncateJS"] = factory();
	else
		root["TruncateJS"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Dom.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TEXT_CONTENT_PROPS = ['nodeValue', 'textContent', 'innerText'];

var Dom =
/*#__PURE__*/
function () {
  function Dom() {
    _classCallCheck(this, Dom);
  }

  _createClass(Dom, null, [{
    key: "text",
    value: function text(el, content) {
      // Set
      if (arguments.length >= 2) {
        for (var _i = 0; _i < TEXT_CONTENT_PROPS.length; _i++) {
          var prop = TEXT_CONTENT_PROPS[_i];
          el[prop] = content;
        }

        return content;
      } // Get


      for (var _i2 = 0; _i2 < TEXT_CONTENT_PROPS.length; _i2++) {
        var _prop = TEXT_CONTENT_PROPS[_i2];

        if (typeof el[_prop] === 'string') {
          return el[_prop];
        }
      }

      return '';
    }
  }, {
    key: "clear",
    value: function clear(el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
  }, {
    key: "css",
    value: function css(el, prop, parse) {
      var computedStyle = getComputedStyle(el);

      if (!prop) {
        return computedStyle;
      }

      var val = computedStyle.getPropertyValue(prop);
      return parse ? parseFloat(val) || 0 : val;
    }
  }, {
    key: "style",
    value: function style(el, prop, value) {
      // Set single property
      if (arguments.length >= 3) {
        el.style.setProperty(prop, value);
        return;
      } // Set multiple properties


      if (_typeof(prop) === 'object') {
        Object.keys(prop).forEach(function (p) {
          return el.style.setProperty(p, prop[p]);
        });
        return;
      } // Get single property


      if (typeof prop === 'string') {
        return el.style.getPropertyValue(prop);
      }

      return el.style;
    }
  }, {
    key: "innerHeight",
    value: function innerHeight(el) {
      var arr = ['padding-bottom', 'padding-top'];
      var padding = 0;

      for (var _i3 = 0; _i3 < arr.length; _i3++) {
        var prop = arr[_i3];
        padding += Dom.css(el, prop, true);
      }

      var height = Dom.css(el, 'height', true);
      return (height || el.offsetHeight) - padding;
    }
  }, {
    key: "append",
    value: function append(el, content) {
      if (el.nodeType === Node.ELEMENT_NODE || el.nodeType === Node.DOCUMENT_FRAGMENT_NODE || el.nodeType === Node.DOCUMENT_NODE) {
        el.appendChild(content);
      }

      return content;
    }
  }, {
    key: "remove",
    value: function remove(el) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }

      return el;
    }
  }, {
    key: "replace",
    value: function replace(oldNode, newNode) {
      if (oldNode.parentNode) {
        oldNode.parentNode.replaceChild(newNode, oldNode);
      }

      return oldNode;
    }
  }, {
    key: "contents",
    value: function contents(el) {
      return Array.from(el.childNodes);
    }
  }]);

  return Dom;
}();


// CONCATENATED MODULE: ./src/TruncateJS.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_OPTIONS", function() { return DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_CHARACTERS", function() { return FILTER_CHARACTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_NAME_PREFIX", function() { return CLASS_NAME_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_NAMES", function() { return CLASS_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TruncateJS_TruncateJS; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TruncateJS_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TruncateJS_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TruncateJS_createClass(Constructor, protoProps, staticProps) { if (protoProps) TruncateJS_defineProperties(Constructor.prototype, protoProps); if (staticProps) TruncateJS_defineProperties(Constructor, staticProps); return Constructor; }



var ResizeObserver = function ResizeObserver(el, handler) {
  el.addEventListener('resize', handler);
  return {
    destroy: function destroy() {
      return el.removeEventListener('resize', handler);
    }
  };
};

var DEFAULT_OPTIONS = {
  callback: function callback() {},
  ellipsis: "\u2026",
  height: null,
  tolerance: 0,
  truncate: 'word',
  watch: 'window',
  debug: false
};
var FILTER_CHARACTERS = [' ', "\u3000", ',', ';', '.', '!', '?'];
var CLASS_NAME_PREFIX = 'truncate-js';
var CLASS_NAMES = {
  keep: "".concat(CLASS_NAME_PREFIX, "-keep"),
  truncated: "".concat(CLASS_NAME_PREFIX, "-truncated")
};

var TruncateJS_TruncateJS =
/*#__PURE__*/
function () {
  function TruncateJS(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    TruncateJS_classCallCheck(this, TruncateJS);

    this.el = el;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.debug = this.options.debug;
    this.originalContent = this._getOriginalContent();
    this.originalStyles = this.el.getAttribute('style');
    this.init();
    this.truncate();

    if (this.options.watch) {
      this._watch();
    }
  }

  TruncateJS_createClass(TruncateJS, [{
    key: "init",
    value: function init() {
      this.$options = _objectSpread({}, this.options);

      if (Dom.css(this.el, 'word-wrap') !== 'break-word') {
        Dom.style(this.el, 'word-wrap', 'break-word');
      }

      if (Dom.css(this.el, 'white-space') === 'nowrap') {
        Dom.style(this.el, 'white-space', 'normal');
      }

      if (this.options.height === null) {
        this.$options.height = this._getMaxHeight();
      }

      if (typeof this.options.ellipsis === 'string') {
        this.$options.ellipsis = document.createTextNode(this.options.ellipsis);
      }
    }
  }, {
    key: "truncate",
    value: function truncate() {
      var _this = this;

      // Create wrapper element to calculate size
      this.inner = document.createElement('div');
      Dom.style(this.inner, {
        border: 'none',
        display: 'block',
        height: 'auto',
        margin: 0,
        padding: 0,
        width: 'auto'
      }); // Wrap the contents with this.inner

      Dom.clear(this.el);
      Dom.append(this.el, this.inner);
      this.originalContent.forEach(function (n) {
        return Dom.append(_this.inner, n.cloneNode(true));
      });
      this.maxHeight = this._getMaxHeight();
      var isTruncated = false;

      if (this._shouldTruncate()) {
        isTruncated = true;

        this._truncateToNode(this.inner);
      } // Add/remove the truncated class


      this.el.classList[isTruncated ? 'add' : 'remove'](CLASS_NAMES.truncated); // Unwrap the children

      Dom.clear(this.el);
      Dom.contents(this.inner).forEach(function (node) {
        Dom.append(_this.el, node);
      });
      this.inner = null;

      if (this.$options.callback) {
        this.$options.callback.call(this.el, isTruncated);
      }

      return isTruncated;
    }
  }, {
    key: "restore",
    value: function restore() {
      var _this2 = this;

      this._unwatch();

      Dom.clear(this.el);
      this.originalContent.forEach(function (n) {
        return Dom.append(_this2.el, n);
      });
      this.el.setAttribute('style', this.originalStyles || '');
      this.el.classList.remove(CLASS_NAMES.truncated);
    }
  }, {
    key: "_watch",
    value: function _watch() {
      var _this3 = this;

      this._unwatch();

      var oldSizes = {};

      var checkSizes = function checkSizes() {
        var newSizes = {
          height: _this3.$options.watch === 'window' ? window.innerHeight : _this3.el.offsetHeight,
          width: _this3.$options.watch === 'window' ? window.innerWidth : _this3.el.offsetWidth
        };

        if (oldSizes.height !== newSizes.height || oldSizes.width !== newSizes.width) {
          _this3.truncate();
        }

        return newSizes;
      };

      if (this.$options.watch === 'watch') {
        this._windowObserver = ResizeObserver(window, function () {
          if (_this3._watchTimeout) {
            clearTimeout(_this3._watchTimeout);
          }

          _this3._watchTimeout = setTimeout(function () {
            return oldSizes = checkSizes();
          }, 100);
        });
      } else {
        this._watchInterval = setInterval(function () {
          return oldSizes = checkSizes();
        }, 500);
      }
    }
  }, {
    key: "_unwatch",
    value: function _unwatch() {
      if (this._windowObserver) {
        this._windowObserver.destroy();

        this._windowObserver = null;
      }

      if (this._watchInterval) {
        clearInterval(this._watchInterval);
      }

      if (this._watchTimeout) {
        clearTimeout(this._watchTimeout);
      }
    }
  }, {
    key: "_truncateToNode",
    value: function _truncateToNode(el) {
      var comments = [];
      var elements = []; // Empty the node, replace all contents with comment nodes

      Dom.contents(el).forEach(function (node) {
        var comment = document.createComment('');
        elements.push(Dom.replace(node, comment));
        comments.push(comment);
      });

      if (!elements.length) {
        return;
      }

      var i; // Re-fill the node, replace all comments until it doesn't fit anymore

      for (i = 0; i < elements.length; i++) {
        Dom.replace(comments[i], elements[i]);
        Dom.append(elements[i], this.$options.ellipsis);

        var shouldTruncate = this._shouldTruncate();

        Dom.remove(this.$options.ellipsis);

        if (shouldTruncate) {
          if (this.$options.truncate === 'node' && i > 1) {
            Dom.remove(elements[i - 2]);
            return;
          }

          break;
        }
      } // Remove left over comments


      for (var c = i; c < comments.length; c++) {
        Dom.remove(comments[c]);
      } // Get the last node (the node that overflows)


      var last = elements[Math.max(0, Math.min(i, elements.length - 1))]; // Handle case when last node only has the ellipsis in it

      if (last.nodeType === Node.ELEMENT_NODE) {
        var e = document.createElement(last.nodeName);
        Dom.append(e, this.$options.ellipsis);
        Dom.replace(last, e); // If it fits, restore the full last node

        if (!this._shouldTruncate()) {
          Dom.replace(e, last);
        } else {
          Dom.remove(e);
          last = elements[Math.max(0, i - 1)];
        }
      } // Proceed inside last node


      if (last.nodeType === Node.ELEMENT_NODE) {
        this._truncateToNode(last);
      } else {
        this._truncateToWord(last);
      }
    }
  }, {
    key: "_truncateToWord",
    value: function _truncateToWord(el) {
      var text = Dom.text(el);
      var separator = ~text.indexOf(' ') ? ' ' : "\u3000";
      var arr = text.split(separator);
      var str = '';

      for (var i = arr.length; i >= 0; i--) {
        str = arr.slice(0, i).join(separator);
        Dom.text(el, this._addEllipsis(str));

        if (!this._shouldTruncate()) {
          if (this.$options.truncate === 'letter') {
            Dom.text(el, arr.slice(0, i + 1).join(separator));

            this._truncateToLetter(el);
          }

          break;
        }
      }
    }
  }, {
    key: "_truncateToLetter",
    value: function _truncateToLetter(el) {
      var text = Dom.text(el);
      var arr = text.split('');
      var str = '';

      for (var i = arr.length; i >= 0; i--) {
        str = arr.slice(0, i).join('');

        if (!str.length) {
          continue;
        }

        Dom.text(el, this._addEllipsis(str));

        if (!this._shouldTruncate()) {
          break;
        }
      }
    }
  }, {
    key: "_shouldTruncate",
    value: function _shouldTruncate() {
      return Dom.innerHeight(this.inner) > this.maxHeight + this.$options.tolerance;
    }
    /**
     * Util methods
     */

  }, {
    key: "_getOriginalContent",
    value: function _getOriginalContent() {
      var trim = function trim(str) {
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return str == null ? '' : (str + '').replace(rtrim, '');
      };

      Dom.contents(this.el).forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (trim(Dom.text(node)) === '') {
            if (!node.nextSibling) {
              Dom.remove(node);
              return;
            }

            if (!node.previousSibling) {
              Dom.remove(node);
              return;
            }

            if (['table', 'thead', 'tbody', 'tfoot', 'tr', 'dl', 'ul', 'ol', 'video'].includes(node.parentNode.nodeName.toLowerCase())) {
              Dom.remove(node);
              return;
            }

            if (['div', 'p', 'table', 'td', 'dt', 'dd', 'li'].includes(node.previousSibling.nodeName.toLowerCase())) {
              Dom.remove(node);
              return;
            }

            if (['div', 'p', 'table', 'td', 'dt', 'dd', 'li'].includes(node.nextSibling.nodeName.toLowerCase())) {
              Dom.remove(node);
              return;
            }
          }
        }
      });
      return Dom.contents(this.el);
    }
  }, {
    key: "_getMaxHeight",
    value: function _getMaxHeight() {
      if (typeof this.$options.height === 'number') {
        return this.$options.height;
      }

      var arr = ['height', 'maxHeight'];
      var height = 0;

      for (var _i = 0; _i < arr.length; _i++) {
        var prop = arr[_i];
        var val = Dom.css(this.el, prop, true);

        if (val) {
          height = val;
          break;
        }
      }

      arr.length = 0;

      switch (Dom.css(this.el, 'box-sizing')) {
        case 'border-box':
          arr.push('border-top-width', 'border-bottom-width');
        // Don't break, padding needs to be applied too
        // eslint-disable-next-line no-fallthrough

        case 'padding-box':
          arr.push('padding-bottom', 'padding-top');
          break;
      }

      for (var _i2 = 0; _i2 < arr.length; _i2++) {
        var _prop = arr[_i2];
        height -= Dom.css(this.el, _prop, true);
      }

      return Math.max(height, 0);
    }
  }, {
    key: "_addEllipsis",
    value: function _addEllipsis(str) {
      while (FILTER_CHARACTERS.includes(str.slice(-1))) {
        str = str.slice(0, -1);
      }

      str += Dom.text(this.$options.ellipsis);
      return str;
    }
  }]);

  return TruncateJS;
}();



/***/ })
/******/ ]);
});