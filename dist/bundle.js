/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Calculator.js":
/*!***************************!*\
  !*** ./src/Calculator.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Calculator)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Calculator = /*#__PURE__*/function () {\n  function Calculator(previousOperandTextElement, currentOperandTextElement) {\n    _classCallCheck(this, Calculator);\n    this.previousOperandTextElement = previousOperandTextElement;\n    this.currentOperandTextElement = currentOperandTextElement;\n    this.clear();\n  }\n  return _createClass(Calculator, [{\n    key: \"clear\",\n    value: function clear() {\n      this.currentOperand = '';\n      this.previousOperand = '';\n      this.operation = undefined;\n    }\n  }, {\n    key: \"appendNumber\",\n    value: function appendNumber(number) {\n      if (number === '.' && this.currentOperand.includes('.')) {\n        return;\n      }\n      this.currentOperand = this.currentOperand.toString() + number.toString();\n    }\n  }, {\n    key: \"appendSign\",\n    value: function appendSign() {\n      if (this.currentOperand === '') {\n        return;\n      }\n      this.currentOperand = parseFloat(this.currentOperand) * -1;\n    }\n  }, {\n    key: \"chooseOperation\",\n    value: function chooseOperation(operation) {\n      if (this.currentOperand === '') {\n        return;\n      }\n      if (this.previousOperand !== '') {\n        this.compute();\n      }\n      this.operation = operation;\n      this.previousOperand = this.currentOperand;\n      this.currentOperand = '';\n    }\n  }, {\n    key: \"compute\",\n    value: function compute() {\n      var computation;\n      var prev = parseFloat(this.previousOperand);\n      var current = parseFloat(this.currentOperand);\n      if (isNaN(prev) || isNaN(current)) {\n        return;\n      }\n      switch (this.operation) {\n        case '+':\n          computation = prev + current;\n          break;\n        case '-':\n          computation = prev - current;\n          break;\n        case '/':\n          computation = prev / current;\n          break;\n        case '*':\n          computation = prev * current;\n          break;\n        case '%':\n          computation = prev * current / 100;\n          break;\n        default:\n          return;\n      }\n      this.currentOperand = computation;\n      this.operation = undefined;\n      this.previousOperand = '';\n    }\n  }, {\n    key: \"getDisplayNumber\",\n    value: function getDisplayNumber(number) {\n      var stringNumber = number.toString();\n      var integerDigits = parseFloat(stringNumber.split('.')[0]);\n      var decimalDigits = stringNumber.split('.')[1];\n      var integerDisplay;\n      if (isNaN(integerDigits)) {\n        integerDisplay = '';\n      } else {\n        integerDisplay = integerDigits.toLocaleString('en', {\n          maximumFractionDigits: 0\n        });\n      }\n      if (decimalDigits != null) {\n        return \"\".concat(integerDisplay, \".\").concat(decimalDigits);\n      } else {\n        return integerDisplay;\n      }\n    }\n  }, {\n    key: \"updateDisplay\",\n    value: function updateDisplay() {\n      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);\n      if (this.operation != null) {\n        this.previousOperandTextElement.innerText = \"\".concat(this.getDisplayNumber(this.previousOperand), \" \").concat(this.operation);\n      } else {\n        this.previousOperandTextElement.innerText = '';\n      }\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://my-app/./src/Calculator.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Calculator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Calculator.js */ \"./src/Calculator.js\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\n\nvar numbers = document.querySelectorAll('[data-number]');\nvar operations = document.querySelectorAll('[data-operation]');\nvar equal = document.querySelector('[data-equals]');\nvar clear = document.querySelector('[data-clear]');\nvar sign = document.querySelector('[data-plusminus-sign]');\nvar previousElement = document.querySelector('[data-previous-operand]');\nvar currentOperandTextElement = document.querySelector('[data-current-operand]');\nvar toggleButton = document.querySelector('[data-theme-toggle]');\nvar calculator = new _Calculator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](previousElement, currentOperandTextElement);\nnumbers.forEach(function (button) {\n  button.addEventListener('click', function () {\n    calculator.appendNumber(button.innerText);\n    calculator.updateDisplay();\n  });\n});\noperations.forEach(function (button) {\n  button.addEventListener('click', function () {\n    calculator.chooseOperation(button.innerText);\n    calculator.updateDisplay();\n  });\n});\nequal.addEventListener('click', function () {\n  calculator.compute();\n  calculator.updateDisplay();\n});\nsign.addEventListener('click', function () {\n  calculator.appendSign();\n  calculator.updateDisplay();\n});\nclear.addEventListener('click', function () {\n  calculator.clear();\n  calculator.updateDisplay();\n});\ntoggleButton.addEventListener('click', function () {\n  document.body.classList.toggle('light-mode');\n});\n\n//# sourceURL=webpack://my-app/./src/index.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-app/./src/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;