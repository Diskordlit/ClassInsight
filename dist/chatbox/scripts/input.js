/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./chatbox/scripts/utils.js":
/*!**********************************!*\
  !*** ./chatbox/scripts/utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentTime: () => (/* binding */ getCurrentTime)
/* harmony export */ });
// Get current time
var getCurrentTime = function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  return hours + ':' + minutes;
};

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./chatbox/scripts/input.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSystemPrompt: () => (/* binding */ addSystemPrompt),
/* harmony export */   addUserPrompt: () => (/* binding */ addUserPrompt)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./chatbox/scripts/utils.js");


// Send user message to chatbox (after entered)
var addUserPrompt = function addUserPrompt(inputField, conversationField) {
  var userInput = document.querySelector(inputField).value;
  if (userInput.trim() !== "") {
    var conversationContainer = document.querySelector(conversationField);
    var userResponse = document.createElement("div");
    userResponse.className = "user-response";
    userResponse.innerHTML = userInput + '<span class="user-timestamp">' + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentTime)() + '</span>';
    conversationContainer.appendChild(userResponse);

    // Optionally, you can clear the input field after sending the response
    userInput.value = "";

    // Scroll to the bottom to keep the latest message visible
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
  }
};

// Handle system messages that are being displayed
var addSystemPrompt = function addSystemPrompt(message, conversationField) {
  var conversationContainer = document.querySelector(conversationField);
  var systemResponse = document.createElement("div");
  systemResponse.className = "system-response";
  systemResponse.innerHTML = message + '<span class="system-timestamp">' + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentTime)() + '</span>';
  conversationContainer.appendChild(systemResponse);

  // Scroll to the bottom to keep the latest message visible
  conversationContainer.scrollTop = conversationContainer.scrollHeight;
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJveC9zY3JpcHRzL2lucHV0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTyxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQUEsRUFBUztFQUNoQyxJQUFNQyxHQUFHLEdBQUcsSUFBSUMsSUFBSSxDQUFDLENBQUM7RUFDdEIsSUFBTUMsS0FBSyxHQUFHRixHQUFHLENBQUNHLFFBQVEsQ0FBQyxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQ3hELElBQU1DLE9BQU8sR0FBR04sR0FBRyxDQUFDTyxVQUFVLENBQUMsQ0FBQyxDQUFDSCxRQUFRLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUM1RCxPQUFPSCxLQUFLLEdBQUcsR0FBRyxHQUFHSSxPQUFPO0FBQ2hDLENBQUM7Ozs7OztVQ05EO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTjRDOztBQUU1QztBQUNPLElBQU1FLGFBQWEsR0FBRyxTQUFoQkEsYUFBYUEsQ0FBSUMsVUFBVSxFQUFFQyxpQkFBaUIsRUFBSztFQUM1RCxJQUFNQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDSixVQUFVLENBQUMsQ0FBQ0ssS0FBSztFQUMxRCxJQUFJSCxTQUFTLENBQUNJLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3pCLElBQU1DLHFCQUFxQixHQUFHSixRQUFRLENBQUNDLGFBQWEsQ0FBQ0gsaUJBQWlCLENBQUM7SUFDdkUsSUFBTU8sWUFBWSxHQUFHTCxRQUFRLENBQUNNLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDbERELFlBQVksQ0FBQ0UsU0FBUyxHQUFHLGVBQWU7SUFDeENGLFlBQVksQ0FBQ0csU0FBUyxHQUFHVCxTQUFTLEdBQzlCLCtCQUErQixHQUFHWix5REFBYyxDQUFDLENBQUMsR0FBRyxTQUFTO0lBQ2xFaUIscUJBQXFCLENBQUNLLFdBQVcsQ0FBQ0osWUFBWSxDQUFDOztJQUUvQztJQUNBTixTQUFTLENBQUNHLEtBQUssR0FBRyxFQUFFOztJQUVwQjtJQUNBRSxxQkFBcUIsQ0FBQ00sU0FBUyxHQUFHTixxQkFBcUIsQ0FBQ08sWUFBWTtFQUN4RTtBQUNKLENBQUM7O0FBRUQ7QUFDTyxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWVBLENBQUlDLE9BQU8sRUFBRWYsaUJBQWlCLEVBQUs7RUFDM0QsSUFBTU0scUJBQXFCLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDSCxpQkFBaUIsQ0FBQztFQUN2RSxJQUFNZ0IsY0FBYyxHQUFHZCxRQUFRLENBQUNNLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDcERRLGNBQWMsQ0FBQ1AsU0FBUyxHQUFHLGlCQUFpQjtFQUM1Q08sY0FBYyxDQUFDTixTQUFTLEdBQUdLLE9BQU8sR0FDOUIsaUNBQWlDLEdBQUcxQix5REFBYyxDQUFDLENBQUMsR0FBRyxTQUFTO0VBQ3BFaUIscUJBQXFCLENBQUNLLFdBQVcsQ0FBQ0ssY0FBYyxDQUFDOztFQUVqRDtFQUNBVixxQkFBcUIsQ0FBQ00sU0FBUyxHQUFHTixxQkFBcUIsQ0FBQ08sWUFBWTtBQUN4RSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGFzc2luc2lnaHQvLi9jaGF0Ym94L3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2xhc3NpbnNpZ2h0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsYXNzaW5zaWdodC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2xhc3NpbnNpZ2h0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2xhc3NpbnNpZ2h0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2xhc3NpbnNpZ2h0Ly4vY2hhdGJveC9zY3JpcHRzL2lucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdldCBjdXJyZW50IHRpbWVcclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRUaW1lID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IGhvdXJzID0gbm93LmdldEhvdXJzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3QgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcztcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Q3VycmVudFRpbWUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xyXG5cclxuLy8gU2VuZCB1c2VyIG1lc3NhZ2UgdG8gY2hhdGJveCAoYWZ0ZXIgZW50ZXJlZClcclxuZXhwb3J0IGNvbnN0IGFkZFVzZXJQcm9tcHQgPSAoaW5wdXRGaWVsZCwgY29udmVyc2F0aW9uRmllbGQpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5wdXRGaWVsZCkudmFsdWU7XHJcbiAgICBpZiAodXNlcklucHV0LnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udmVyc2F0aW9uRmllbGQpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJSZXNwb25zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdXNlclJlc3BvbnNlLmNsYXNzTmFtZSA9IFwidXNlci1yZXNwb25zZVwiO1xyXG4gICAgICAgIHVzZXJSZXNwb25zZS5pbm5lckhUTUwgPSB1c2VySW5wdXQgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ1c2VyLXRpbWVzdGFtcFwiPicgKyBnZXRDdXJyZW50VGltZSgpICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgIGNvbnZlcnNhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyUmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIGNsZWFyIHRoZSBpbnB1dCBmaWVsZCBhZnRlciBzZW5kaW5nIHRoZSByZXNwb25zZVxyXG4gICAgICAgIHVzZXJJbnB1dC52YWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgYm90dG9tIHRvIGtlZXAgdGhlIGxhdGVzdCBtZXNzYWdlIHZpc2libGVcclxuICAgICAgICBjb252ZXJzYXRpb25Db250YWluZXIuc2Nyb2xsVG9wID0gY29udmVyc2F0aW9uQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gSGFuZGxlIHN5c3RlbSBtZXNzYWdlcyB0aGF0IGFyZSBiZWluZyBkaXNwbGF5ZWRcclxuZXhwb3J0IGNvbnN0IGFkZFN5c3RlbVByb21wdCA9IChtZXNzYWdlLCBjb252ZXJzYXRpb25GaWVsZCkgPT4ge1xyXG4gICAgY29uc3QgY29udmVyc2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb252ZXJzYXRpb25GaWVsZCk7XHJcbiAgICBjb25zdCBzeXN0ZW1SZXNwb25zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzeXN0ZW1SZXNwb25zZS5jbGFzc05hbWUgPSBcInN5c3RlbS1yZXNwb25zZVwiO1xyXG4gICAgc3lzdGVtUmVzcG9uc2UuaW5uZXJIVE1MID0gbWVzc2FnZSArXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic3lzdGVtLXRpbWVzdGFtcFwiPicgKyBnZXRDdXJyZW50VGltZSgpICsgJzwvc3Bhbj4nO1xyXG4gICAgY29udmVyc2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHN5c3RlbVJlc3BvbnNlKTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gdGhlIGJvdHRvbSB0byBrZWVwIHRoZSBsYXRlc3QgbWVzc2FnZSB2aXNpYmxlXHJcbiAgICBjb252ZXJzYXRpb25Db250YWluZXIuc2Nyb2xsVG9wID0gY29udmVyc2F0aW9uQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxufSJdLCJuYW1lcyI6WyJnZXRDdXJyZW50VGltZSIsIm5vdyIsIkRhdGUiLCJob3VycyIsImdldEhvdXJzIiwidG9TdHJpbmciLCJwYWRTdGFydCIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiYWRkVXNlclByb21wdCIsImlucHV0RmllbGQiLCJjb252ZXJzYXRpb25GaWVsZCIsInVzZXJJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInZhbHVlIiwidHJpbSIsImNvbnZlcnNhdGlvbkNvbnRhaW5lciIsInVzZXJSZXNwb25zZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImFkZFN5c3RlbVByb21wdCIsIm1lc3NhZ2UiLCJzeXN0ZW1SZXNwb25zZSJdLCJzb3VyY2VSb290IjoiIn0=