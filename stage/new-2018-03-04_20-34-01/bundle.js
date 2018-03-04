/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class.ball */ "./src/class.ball.js");
/* harmony import */ var _class_BallCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class.BallCollection */ "./src/class.BallCollection.js");
/* harmony import */ var _module_canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module.canvas */ "./src/module.canvas.js");













window.addEventListener('click', (e) => {
    var ballCollection = new _class_BallCollection__WEBPACK_IMPORTED_MODULE_1__["default"]();
    ballCollection.addMutiple(300);
    ballCollection.setLeader(_module_canvas__WEBPACK_IMPORTED_MODULE_2__["default"].getCenter());

    ballCollection.setFrictionFactor(0.);
    ballCollection.setRndmSpeed(5);
    ballCollection.setSpeed(10);
    ballCollection.setRndmColor();
    ballCollection.setPosition({
        x: e.clientX,
        y: e.clientY
    });
    ballCollection.randomizeForces(50);
    ballCollection.spark(1000);

    setTimeout(()=>{ ballCollection.setLeader({
        x: e.clientX,
        y: e.clientY
    }) }, 2000);


    let mainInterval = setInterval(() => {
        _module_canvas__WEBPACK_IMPORTED_MODULE_2__["default"].clear();
        ballCollection.process();
        ballCollection.drawAll();
    }, 30);
});

/***/ }),

/***/ "./src/class.BallCollection.js":
/*!*************************************!*\
  !*** ./src/class.BallCollection.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BallCollection; });
/* harmony import */ var _class_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class.ball */ "./src/class.ball.js");



class BallCollection {

    constructor() {
        this.ballArray = new Array();
    }



    getSize() {
        return this.ballArray.length;
    }

    // ADD EXISTING BALL
    addBall(ball) {
        this.ballArray.push(ball);
    }

    // ADD NEW BALL
    addNewBall(radius) {
        var ball = new _class_ball__WEBPACK_IMPORTED_MODULE_0__["default"](radius);
        this.ballArray.push(ball);
    }

    // ADD MUTIPLE BALLS
    addMutiple(amount) {
        for (var i = 0; i < amount; i += 1) {
            var ball = new _class_ball__WEBPACK_IMPORTED_MODULE_0__["default"]();
            this.ballArray.push(ball);
        }
    }

    // ADD RANDOM BALL
    addRndmBall(radius) {
        var ball = new _class_ball__WEBPACK_IMPORTED_MODULE_0__["default"](radius);
        ball.xforce = Math.random() * 5;
        ball.yforce = Math.random() * 8;
        this.ballArray.push(ball);
    }

    // SET COLOR OF ALL
    changeColor(red, green, blue, alpha) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].setColor(red, green, blue, alpha);
        }
    }

    setPosition(pixel) {
        this.ballArray.forEach((ball) => {
            ball.setPosition(pixel);
        });
    }

    // TRANSLATE ALL BALLS (TO LEADER POS)
    toLeaderPos() {
        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.x = ball.leader.x;
            ball.y = ball.leader.y;
            ball.xforce = ball.xforce * 0.001;
            ball.yforce = ball.yforce * 0.001;
        }
    }

    // PROCESS ALL BALLS
    process() {
        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.process();
            ball.trackObject(ball.leader);
        }
    }

    // DRAW ALL
    drawAll() {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].draw();
        }
    }

    // RANDOMIZE FORCES ALL
    randomizeForces(factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].randomizeForces(factor);
        }
    }

    // FORCE TO XY
    forceTo(x, y, factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].forceTo(x, y, factor);
        }
    }

    // SET LEADER FOR TRACKING
    setLeader(leader) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].leader = leader;
        }
    }

    // @Deprecated
    // TRACK RENDER IMAGE PIXELS
    drawRenderImage(renderimage) {
        var imagepixels = renderimage.pixelsum;
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].leader = renderimage.pixelarray[i % imagepixels];
        }
    }

    // SET FRICTION FACTOR
    setFrictionFactor(factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].frictionfactor = factor;
        }
    }

    // SET SPEED
    setSpeed(speed) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].trackspeed = speed;
        }
    }

    setRndmSpeed(factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].trackspeed = this.ballArray[i].trackspeed * (factor * (Math.random() - 0.5));
        }
    }

    // SET ALPHA
    setAlpha(alpha) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].alpha = alpha;
        }
    }

    // SET RANDOM RGB(A)
    setRndmColor() {

        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);

        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.red = red;
            ball.green = green;
            ball.blue = blue;
        }
    }


    // SET TRIANGLE
    makeForm(edges, distance, rndmFactor) {

        // for lines
        for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
            var formCenter = new Pixel(Math.random() * canvas.width, Math.random() * canvas.height);

            for (var j = 0; j < edges; j += 1) {
                var ball = this.ballArray[i + j];
                var ballNext = this.ballArray[i + ((j + 1) % (edges))];
                ball.follower = ballNext;
                ball.leader = formCenter;
            }
        }

        // for distances
        var angle = 360 / edges;
        for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
            var distanceRNDM = distance + ((Math.random() - 0.5) * rndmFactor * distance * 2);
            for (var j = 0; j < edges; j += 1) {
                var ball = this.ballArray[i + j];

                var factorX = MathD.sin(angle * j);
                var factorY = MathD.cos(angle * j);

                var xplus = factorX * distanceRNDM;
                var yplus = factorY * distanceRNDM;
                ball.leader = new Pixel(ball.leader.x + xplus, ball.leader.y + yplus);
            }
        }
    }



    // MAKE WATER
    makeWater(pixel) {
        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.forceToDelay(pixel);
        }
    }

    spark(intensity) {
        this.ballArray.forEach((ball) => {
            ball.setLeader({
                x: ball.x + (Math.random() - 0.5) * intensity,
                y: ball.y + (Math.random() - 0.5) * intensity
            })
        });
    }
}

/***/ }),

/***/ "./src/class.ball.js":
/*!***************************!*\
  !*** ./src/class.ball.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ball; });
/* harmony import */ var _module_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module.canvas */ "./src/module.canvas.js");
/* harmony import */ var _colorConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorConfig */ "./src/colorConfig.js");



class Ball {
    constructor() {
        this.radius = 2;
        this.x = 4;
        this.y = 4;
        this.xforce = 0;
        this.yforce = 0;
        this.xdistance = 0;
        this.ydistance = 0;

        this.leader;
        this.trackspeed = 0.4;
        this.frictionfactor = 0.9;
        this.follower = this;

        this.red = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.red;
        this.green = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.green;
        this.blue = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.blue;
        this.alpha = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.alpha;
    }

    getColor() {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    }

    setColor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    setPosition(pixel) { 
        this.x = pixel.x;
        this.y = pixel.y;
    }

    setLeader(pixel) {
        this.leader = pixel;
    }

    draw() {
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.strokeStyle = this.getColor();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.lineWidth = 1;
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.beginPath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.moveTo(this.x, this.y);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.lineTo(this.follower.x, this.follower.y);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.stroke();
    
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.fillStyle = this.getColor();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.beginPath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.closePath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.fill();
    }

    process() {
        this.x += this.xforce;
        this.y += this.yforce;
        var xf = this.xforce;
        var yf = this.yforce;
        this.xforce = this.xforce * this.frictionfactor;
        this.yforce = this.yforce * this.frictionfactor;
    }

    trackObject(object) {
        this.xdistance = this.x - object.x;
        this.ydistance = this.y - object.y;
        var absolutedistance = (Math.abs(this.xdistance) +
            Math.abs(this.ydistance)) / 2;
        this.xforce += (this.xdistance / (absolutedistance)) * (-this.trackspeed) * absolutedistance / 100;
        this.yforce += (this.ydistance / (absolutedistance)) * (-this.trackspeed) * absolutedistance / 100;
        //this.radius = Math.min(5, 40/absolutedistance);
        this.alpha = Math.min(255, 50 / absolutedistance);
    }

    forceTo(x, y, factor) {
        this.xdistance = this.x - x;
        this.ydistance = this.y - y;
    
        this.xforce += this.xdistance * -factor / 100;
        this.yforce += this.ydistance * -factor / 100;
    }

    randomizeForces(factor) {
        this.xforce = (Math.random() - 0.5) * factor;
        this.yforce = (Math.random() - 0.5) * factor;
    }

    forceToDelay   (pixel) {
        var xdistance = this.x - pixel.x;
        var ydistance = this.y - pixel.y;
        var absolutedistance = Math.sqrt(xdistance * xdistance +
            ydistance * ydistance);
        var delay = absolutedistance * 2;
    
        var self = this;
        var forceFactor = 1.0;
    
        setTimeout(function () {
            self.xforce += (xdistance / (absolutedistance)) * forceFactor;
            self.yforce += (ydistance / (absolutedistance)) * forceFactor;
        }, delay);
    }
    
}


/***/ }),

/***/ "./src/colorConfig.js":
/*!****************************!*\
  !*** ./src/colorConfig.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    canvasColor: 'rgba(0,0,0,0.08)',

    ballColor: {
        red: "255",
        green: "255",
        blue: "255",
        alpha: "1"
    },


});

/***/ }),

/***/ "./src/module.canvas.js":
/*!******************************!*\
  !*** ./src/module.canvas.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colorConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorConfig */ "./src/colorConfig.js");


/* harmony default export */ __webpack_exports__["default"] = (buildCanvas());


function buildCanvas() {
    let canvas = document.getElementById('canvas');

    canvas.ctx = canvas.getContext('2d');
    canvas.ctx.fillStyle = _colorConfig__WEBPACK_IMPORTED_MODULE_0__["default"].canvasColor;

    canvas.fitToScreen = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    canvas.getCenter = function () {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
    }

    canvas.clear = function () {
        canvas.ctx.fillStyle = _colorConfig__WEBPACK_IMPORTED_MODULE_0__["default"].canvasColor;
        canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }



    // Fullscreen
    window.addEventListener('resize', canvas.fitToScreen);
    canvas.fitToScreen();
    canvas.clear();

    return canvas;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuQmFsbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmJhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbG9yQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGUuY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLEtBQUssR0FBRzs7O0FBR1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxFOzs7Ozs7Ozs7Ozs7Ozs7QUN4Q0Q7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixtREFBbUQ7QUFDMUU7O0FBRUEsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsbURBQW1EO0FBQzFFO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM1R0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0wsRzs7Ozs7Ozs7Ozs7Ozs7QUNYQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLmpzXCIpO1xuIiwiaW1wb3J0IEJhbGwgZnJvbSAnLi9jbGFzcy5iYWxsJztcbmltcG9ydCBCYWxsQ29sbGVjdGlvbiBmcm9tICcuL2NsYXNzLkJhbGxDb2xsZWN0aW9uJztcbmltcG9ydCBDQU5WQVMgZnJvbSAnLi9tb2R1bGUuY2FudmFzJztcblxuXG5cblxuXG5cblxuXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICB2YXIgYmFsbENvbGxlY3Rpb24gPSBuZXcgQmFsbENvbGxlY3Rpb24oKTtcbiAgICBiYWxsQ29sbGVjdGlvbi5hZGRNdXRpcGxlKDMwMCk7XG4gICAgYmFsbENvbGxlY3Rpb24uc2V0TGVhZGVyKENBTlZBUy5nZXRDZW50ZXIoKSk7XG5cbiAgICBiYWxsQ29sbGVjdGlvbi5zZXRGcmljdGlvbkZhY3RvcigwLik7XG4gICAgYmFsbENvbGxlY3Rpb24uc2V0Um5kbVNwZWVkKDUpO1xuICAgIGJhbGxDb2xsZWN0aW9uLnNldFNwZWVkKDEwKTtcbiAgICBiYWxsQ29sbGVjdGlvbi5zZXRSbmRtQ29sb3IoKTtcbiAgICBiYWxsQ29sbGVjdGlvbi5zZXRQb3NpdGlvbih7XG4gICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgeTogZS5jbGllbnRZXG4gICAgfSk7XG4gICAgYmFsbENvbGxlY3Rpb24ucmFuZG9taXplRm9yY2VzKDUwKTtcbiAgICBiYWxsQ29sbGVjdGlvbi5zcGFyaygxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoKCk9PnsgYmFsbENvbGxlY3Rpb24uc2V0TGVhZGVyKHtcbiAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICB5OiBlLmNsaWVudFlcbiAgICB9KSB9LCAyMDAwKTtcblxuXG4gICAgbGV0IG1haW5JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgQ0FOVkFTLmNsZWFyKCk7XG4gICAgICAgIGJhbGxDb2xsZWN0aW9uLnByb2Nlc3MoKTtcbiAgICAgICAgYmFsbENvbGxlY3Rpb24uZHJhd0FsbCgpO1xuICAgIH0sIDMwKTtcbn0pOyIsImltcG9ydCBCYWxsIGZyb20gJy4vY2xhc3MuYmFsbCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbENvbGxlY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgfVxuXG5cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbGxBcnJheS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gQUREIEVYSVNUSU5HIEJBTExcbiAgICBhZGRCYWxsKGJhbGwpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICB9XG5cbiAgICAvLyBBREQgTkVXIEJBTExcbiAgICBhZGROZXdCYWxsKHJhZGl1cykge1xuICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKHJhZGl1cyk7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gQUREIE1VVElQTEUgQkFMTFNcbiAgICBhZGRNdXRpcGxlKGFtb3VudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFtb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKCk7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheS5wdXNoKGJhbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQUREIFJBTkRPTSBCQUxMXG4gICAgYWRkUm5kbUJhbGwocmFkaXVzKSB7XG4gICAgICAgIHZhciBiYWxsID0gbmV3IEJhbGwocmFkaXVzKTtcbiAgICAgICAgYmFsbC54Zm9yY2UgPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgYmFsbC55Zm9yY2UgPSBNYXRoLnJhbmRvbSgpICogODtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICB9XG5cbiAgICAvLyBTRVQgQ09MT1IgT0YgQUxMXG4gICAgY2hhbmdlQ29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5zZXRDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbihwaXhlbCkge1xuICAgICAgICB0aGlzLmJhbGxBcnJheS5mb3JFYWNoKChiYWxsKSA9PiB7XG4gICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKHBpeGVsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVFJBTlNMQVRFIEFMTCBCQUxMUyAoVE8gTEVBREVSIFBPUylcbiAgICB0b0xlYWRlclBvcygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2ldO1xuICAgICAgICAgICAgYmFsbC54ID0gYmFsbC5sZWFkZXIueDtcbiAgICAgICAgICAgIGJhbGwueSA9IGJhbGwubGVhZGVyLnk7XG4gICAgICAgICAgICBiYWxsLnhmb3JjZSA9IGJhbGwueGZvcmNlICogMC4wMDE7XG4gICAgICAgICAgICBiYWxsLnlmb3JjZSA9IGJhbGwueWZvcmNlICogMC4wMDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQUk9DRVNTIEFMTCBCQUxMU1xuICAgIHByb2Nlc3MoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwucHJvY2VzcygpO1xuICAgICAgICAgICAgYmFsbC50cmFja09iamVjdChiYWxsLmxlYWRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEUkFXIEFMTFxuICAgIGRyYXdBbGwoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUkFORE9NSVpFIEZPUkNFUyBBTExcbiAgICByYW5kb21pemVGb3JjZXMoZmFjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0ucmFuZG9taXplRm9yY2VzKGZhY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGT1JDRSBUTyBYWVxuICAgIGZvcmNlVG8oeCwgeSwgZmFjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uZm9yY2VUbyh4LCB5LCBmYWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIExFQURFUiBGT1IgVFJBQ0tJTkdcbiAgICBzZXRMZWFkZXIobGVhZGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0ubGVhZGVyID0gbGVhZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQERlcHJlY2F0ZWRcbiAgICAvLyBUUkFDSyBSRU5ERVIgSU1BR0UgUElYRUxTXG4gICAgZHJhd1JlbmRlckltYWdlKHJlbmRlcmltYWdlKSB7XG4gICAgICAgIHZhciBpbWFnZXBpeGVscyA9IHJlbmRlcmltYWdlLnBpeGVsc3VtO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmxlYWRlciA9IHJlbmRlcmltYWdlLnBpeGVsYXJyYXlbaSAlIGltYWdlcGl4ZWxzXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBGUklDVElPTiBGQUNUT1JcbiAgICBzZXRGcmljdGlvbkZhY3RvcihmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5mcmljdGlvbmZhY3RvciA9IGZhY3RvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBTUEVFRFxuICAgIHNldFNwZWVkKHNwZWVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0udHJhY2tzcGVlZCA9IHNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Um5kbVNwZWVkKGZhY3Rvcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLnRyYWNrc3BlZWQgPSB0aGlzLmJhbGxBcnJheVtpXS50cmFja3NwZWVkICogKGZhY3RvciAqIChNYXRoLnJhbmRvbSgpIC0gMC41KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgQUxQSEFcbiAgICBzZXRBbHBoYShhbHBoYSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmFscGhhID0gYWxwaGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgUkFORE9NIFJHQihBKVxuICAgIHNldFJuZG1Db2xvcigpIHtcblxuICAgICAgICB2YXIgcmVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICAgICAgdmFyIGdyZWVuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICAgICAgdmFyIGJsdWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwucmVkID0gcmVkO1xuICAgICAgICAgICAgYmFsbC5ncmVlbiA9IGdyZWVuO1xuICAgICAgICAgICAgYmFsbC5ibHVlID0gYmx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gU0VUIFRSSUFOR0xFXG4gICAgbWFrZUZvcm0oZWRnZXMsIGRpc3RhbmNlLCBybmRtRmFjdG9yKSB7XG5cbiAgICAgICAgLy8gZm9yIGxpbmVzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCkgJiYgaSArIGVkZ2VzIDw9IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IGVkZ2VzKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUNlbnRlciA9IG5ldyBQaXhlbChNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoLCBNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWRnZXM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaSArIGpdO1xuICAgICAgICAgICAgICAgIHZhciBiYWxsTmV4dCA9IHRoaXMuYmFsbEFycmF5W2kgKyAoKGogKyAxKSAlIChlZGdlcykpXTtcbiAgICAgICAgICAgICAgICBiYWxsLmZvbGxvd2VyID0gYmFsbE5leHQ7XG4gICAgICAgICAgICAgICAgYmFsbC5sZWFkZXIgPSBmb3JtQ2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIGRpc3RhbmNlc1xuICAgICAgICB2YXIgYW5nbGUgPSAzNjAgLyBlZGdlcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKSAmJiBpICsgZWRnZXMgPD0gdGhpcy5nZXRTaXplKCk7IGkgKz0gZWRnZXMpIHtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVJORE0gPSBkaXN0YW5jZSArICgoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBybmRtRmFjdG9yICogZGlzdGFuY2UgKiAyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWRnZXM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaSArIGpdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZhY3RvclggPSBNYXRoRC5zaW4oYW5nbGUgKiBqKTtcbiAgICAgICAgICAgICAgICB2YXIgZmFjdG9yWSA9IE1hdGhELmNvcyhhbmdsZSAqIGopO1xuXG4gICAgICAgICAgICAgICAgdmFyIHhwbHVzID0gZmFjdG9yWCAqIGRpc3RhbmNlUk5ETTtcbiAgICAgICAgICAgICAgICB2YXIgeXBsdXMgPSBmYWN0b3JZICogZGlzdGFuY2VSTkRNO1xuICAgICAgICAgICAgICAgIGJhbGwubGVhZGVyID0gbmV3IFBpeGVsKGJhbGwubGVhZGVyLnggKyB4cGx1cywgYmFsbC5sZWFkZXIueSArIHlwbHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLyBNQUtFIFdBVEVSXG4gICAgbWFrZVdhdGVyKHBpeGVsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwuZm9yY2VUb0RlbGF5KHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwYXJrKGludGVuc2l0eSkge1xuICAgICAgICB0aGlzLmJhbGxBcnJheS5mb3JFYWNoKChiYWxsKSA9PiB7XG4gICAgICAgICAgICBiYWxsLnNldExlYWRlcih7XG4gICAgICAgICAgICAgICAgeDogYmFsbC54ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogaW50ZW5zaXR5LFxuICAgICAgICAgICAgICAgIHk6IGJhbGwueSArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGludGVuc2l0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImltcG9ydCBDQU5WQVMgZnJvbSAnLi9tb2R1bGUuY2FudmFzJztcbmltcG9ydCBDT0xPUl9DT05GSUcgZnJvbSAnLi9jb2xvckNvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDI7XG4gICAgICAgIHRoaXMueCA9IDQ7XG4gICAgICAgIHRoaXMueSA9IDQ7XG4gICAgICAgIHRoaXMueGZvcmNlID0gMDtcbiAgICAgICAgdGhpcy55Zm9yY2UgPSAwO1xuICAgICAgICB0aGlzLnhkaXN0YW5jZSA9IDA7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gMDtcblxuICAgICAgICB0aGlzLmxlYWRlcjtcbiAgICAgICAgdGhpcy50cmFja3NwZWVkID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uZmFjdG9yID0gMC45O1xuICAgICAgICB0aGlzLmZvbGxvd2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlZCA9IENPTE9SX0NPTkZJRy5iYWxsQ29sb3IucmVkO1xuICAgICAgICB0aGlzLmdyZWVuID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5ncmVlbjtcbiAgICAgICAgdGhpcy5ibHVlID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5ibHVlO1xuICAgICAgICB0aGlzLmFscGhhID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5hbHBoYTtcbiAgICB9XG5cbiAgICBnZXRDb2xvcigpIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYShcIiArIHRoaXMucmVkICsgXCIsXCIgKyB0aGlzLmdyZWVuICsgXCIsXCIgKyB0aGlzLmJsdWUgKyBcIixcIiArIHRoaXMuYWxwaGEgKyBcIilcIjtcbiAgICB9XG5cbiAgICBzZXRDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSkge1xuICAgICAgICB0aGlzLnJlZCA9IHJlZDtcbiAgICAgICAgdGhpcy5ncmVlbiA9IGdyZWVuO1xuICAgICAgICB0aGlzLmJsdWUgPSBibHVlO1xuICAgICAgICB0aGlzLmFscGhhID0gYWxwaGE7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24ocGl4ZWwpIHsgXG4gICAgICAgIHRoaXMueCA9IHBpeGVsLng7XG4gICAgICAgIHRoaXMueSA9IHBpeGVsLnk7XG4gICAgfVxuXG4gICAgc2V0TGVhZGVyKHBpeGVsKSB7XG4gICAgICAgIHRoaXMubGVhZGVyID0gcGl4ZWw7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgQ0FOVkFTLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBDQU5WQVMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIENBTlZBUy5jdHgubGluZVRvKHRoaXMuZm9sbG93ZXIueCwgdGhpcy5mb2xsb3dlci55KTtcbiAgICAgICAgQ0FOVkFTLmN0eC5zdHJva2UoKTtcbiAgICBcbiAgICAgICAgQ0FOVkFTLmN0eC5maWxsU3R5bGUgPSB0aGlzLmdldENvbG9yKCk7XG4gICAgICAgIENBTlZBUy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIENBTlZBUy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBDQU5WQVMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy54Zm9yY2U7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlmb3JjZTtcbiAgICAgICAgdmFyIHhmID0gdGhpcy54Zm9yY2U7XG4gICAgICAgIHZhciB5ZiA9IHRoaXMueWZvcmNlO1xuICAgICAgICB0aGlzLnhmb3JjZSA9IHRoaXMueGZvcmNlICogdGhpcy5mcmljdGlvbmZhY3RvcjtcbiAgICAgICAgdGhpcy55Zm9yY2UgPSB0aGlzLnlmb3JjZSAqIHRoaXMuZnJpY3Rpb25mYWN0b3I7XG4gICAgfVxuXG4gICAgdHJhY2tPYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHRoaXMueGRpc3RhbmNlID0gdGhpcy54IC0gb2JqZWN0Lng7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gdGhpcy55IC0gb2JqZWN0Lnk7XG4gICAgICAgIHZhciBhYnNvbHV0ZWRpc3RhbmNlID0gKE1hdGguYWJzKHRoaXMueGRpc3RhbmNlKSArXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnlkaXN0YW5jZSkpIC8gMjtcbiAgICAgICAgdGhpcy54Zm9yY2UgKz0gKHRoaXMueGRpc3RhbmNlIC8gKGFic29sdXRlZGlzdGFuY2UpKSAqICgtdGhpcy50cmFja3NwZWVkKSAqIGFic29sdXRlZGlzdGFuY2UgLyAxMDA7XG4gICAgICAgIHRoaXMueWZvcmNlICs9ICh0aGlzLnlkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiAoLXRoaXMudHJhY2tzcGVlZCkgKiBhYnNvbHV0ZWRpc3RhbmNlIC8gMTAwO1xuICAgICAgICAvL3RoaXMucmFkaXVzID0gTWF0aC5taW4oNSwgNDAvYWJzb2x1dGVkaXN0YW5jZSk7XG4gICAgICAgIHRoaXMuYWxwaGEgPSBNYXRoLm1pbigyNTUsIDUwIC8gYWJzb2x1dGVkaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgZm9yY2VUbyh4LCB5LCBmYWN0b3IpIHtcbiAgICAgICAgdGhpcy54ZGlzdGFuY2UgPSB0aGlzLnggLSB4O1xuICAgICAgICB0aGlzLnlkaXN0YW5jZSA9IHRoaXMueSAtIHk7XG4gICAgXG4gICAgICAgIHRoaXMueGZvcmNlICs9IHRoaXMueGRpc3RhbmNlICogLWZhY3RvciAvIDEwMDtcbiAgICAgICAgdGhpcy55Zm9yY2UgKz0gdGhpcy55ZGlzdGFuY2UgKiAtZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIHJhbmRvbWl6ZUZvcmNlcyhmYWN0b3IpIHtcbiAgICAgICAgdGhpcy54Zm9yY2UgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBmYWN0b3I7XG4gICAgICAgIHRoaXMueWZvcmNlID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogZmFjdG9yO1xuICAgIH1cblxuICAgIGZvcmNlVG9EZWxheSAgIChwaXhlbCkge1xuICAgICAgICB2YXIgeGRpc3RhbmNlID0gdGhpcy54IC0gcGl4ZWwueDtcbiAgICAgICAgdmFyIHlkaXN0YW5jZSA9IHRoaXMueSAtIHBpeGVsLnk7XG4gICAgICAgIHZhciBhYnNvbHV0ZWRpc3RhbmNlID0gTWF0aC5zcXJ0KHhkaXN0YW5jZSAqIHhkaXN0YW5jZSArXG4gICAgICAgICAgICB5ZGlzdGFuY2UgKiB5ZGlzdGFuY2UpO1xuICAgICAgICB2YXIgZGVsYXkgPSBhYnNvbHV0ZWRpc3RhbmNlICogMjtcbiAgICBcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZm9yY2VGYWN0b3IgPSAxLjA7XG4gICAgXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi54Zm9yY2UgKz0gKHhkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiBmb3JjZUZhY3RvcjtcbiAgICAgICAgICAgIHNlbGYueWZvcmNlICs9ICh5ZGlzdGFuY2UgLyAoYWJzb2x1dGVkaXN0YW5jZSkpICogZm9yY2VGYWN0b3I7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG4gICAgXG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgY2FudmFzQ29sb3I6ICdyZ2JhKDAsMCwwLDAuMDgpJyxcblxuICAgIGJhbGxDb2xvcjoge1xuICAgICAgICByZWQ6IFwiMjU1XCIsXG4gICAgICAgIGdyZWVuOiBcIjI1NVwiLFxuICAgICAgICBibHVlOiBcIjI1NVwiLFxuICAgICAgICBhbHBoYTogXCIxXCJcbiAgICB9LFxuXG5cbn07IiwiaW1wb3J0IENPTE9SX0NPTkZJRyBmcm9tICcuL2NvbG9yQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDYW52YXMoKTtcblxuXG5mdW5jdGlvbiBidWlsZENhbnZhcygpIHtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuXG4gICAgY2FudmFzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gQ09MT1JfQ09ORklHLmNhbnZhc0NvbG9yO1xuXG4gICAgY2FudmFzLmZpdFRvU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICBjYW52YXMuZ2V0Q2VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IGNhbnZhcy5oZWlnaHQgLyAyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2FudmFzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IENPTE9SX0NPTkZJRy5jYW52YXNDb2xvcjtcbiAgICAgICAgY2FudmFzLmN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICAvLyBGdWxsc2NyZWVuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbnZhcy5maXRUb1NjcmVlbik7XG4gICAgY2FudmFzLmZpdFRvU2NyZWVuKCk7XG4gICAgY2FudmFzLmNsZWFyKCk7XG5cbiAgICByZXR1cm4gY2FudmFzO1xufSJdLCJzb3VyY2VSb290IjoiIn0=