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








var ballCollection = new _class_BallCollection__WEBPACK_IMPORTED_MODULE_1__["default"]();
ballCollection.addMutiple(50);
ballCollection.setLeader({
    x: _module_canvas__WEBPACK_IMPORTED_MODULE_2__["default"].getCenter().x,
    y: _module_canvas__WEBPACK_IMPORTED_MODULE_2__["default"].getCenter().y,
    z: 50
});

ballCollection.setTrackSpeed(1);
ballCollection.setRndmColors();
ballCollection.setFrictionFactor(0.999);





let mainInterval = setInterval(() => {
    _module_canvas__WEBPACK_IMPORTED_MODULE_2__["default"].clear();
    ballCollection.process();
    ballCollection.drawAll();
}, 30);



window.addEventListener('click', (e) => {


    ballCollection.randomizeForces(10);



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
            this.ballArray[i].toLeaderPos();
        }
    }

    // PROCESS ALL BALLS
    process() {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].process();
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
    forceTo(x, y, z, factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].forceTo(x, y, z, factor);
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
    setTrackSpeed(speed) {
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

        // SET RANDOM RGB(A)
        setRndmColors() {
            for (var i = 0; i < this.getSize(); i += 1) {

                var red = Math.floor(Math.random() * 255);
                var green = Math.floor(Math.random() * 255);
                var blue = Math.floor(Math.random() * 255);

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
        this.radius = 400;
        this.x = _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].getCenter().x | 100;
        this.y = _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].getCenter().y | 100;
        this.z =10;
        /* Z-Achse von 10 bis 100 <--- Spectator ist auf 0 */
        this.xforce = 0;
        this.yforce = 0;
        this.zforce = 0;
        this.xdistance = 0;
        this.ydistance = 0;
        this.zdistance = 0;

        this.leader;
        this.trackspeed = 0.4;
        this.frictionfactor = 1;
        this.follower = this;

        this.red = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.red;
        this.green = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.green;
        this.blue = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.blue;
        this.alpha = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.alpha;

        //this.spectatorDistanceZ = 10; // <----
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
        this.z = pixel.z;
    }

    setLeader(pixel) {
        this.leader = pixel;
    }

    draw() {
        // bringing z in

        var newRadius, newX, newY, newColor;


        newRadius = this.radius / (this.z + 80);

        newColor = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha  + ")"; // * (10 / this.z)
        

        

        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.strokeStyle = newColor;
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.lineWidth = 1;
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.beginPath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.moveTo(this.x, this.y);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.lineTo(this.follower.x, this.follower.y);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.stroke();

        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.fillStyle = newColor;
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.beginPath();


        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.arc(this.x, this.y, newRadius, 0, 2 * Math.PI, true);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.closePath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.fill();
    }

    process() {
        this.x += this.xforce;
        this.y += this.yforce;
        this.z += this.zforce;

        this.xforce = this.xforce * this.frictionfactor;
        this.yforce = this.yforce * this.frictionfactor;
        this.zforce = this.zforce * this.frictionfactor;

        if (this.leader) this.trackObject(this.leader);

        if(this.z <= 10) {
            this.z = 10;
            this.zforce = -this.zforce;
        }
    }


    trackObject(object) {
        //console.log(object);
        this.xdistance = this.x - object.x;
        this.ydistance = this.y - object.y;
        this.zdistance = this.z - object.z;
        var absolutedistance =
            (Math.abs(this.xdistance) + Math.abs(this.ydistance) + Math.abs(this.zdistance)) / 3;
            this.xforce += (this.xdistance / absolutedistance) * -absolutedistance / 1000; //(-this.trackspeed) * absolutedistance / 100;
            this.zforce += (this.zdistance / absolutedistance) * -absolutedistance / 1000; //(-this.trackspeed) * absolutedistance / 100;
            this.yforce += (this.ydistance / absolutedistance) * -absolutedistance / 1000; //(-this.trackspeed) * absolutedistance / 100;
            //console.log(this.trackspeed);
        //this.radius = Math.min(5, 40/absolutedistance);
        //this.alpha = Math.min(255, 50 / absolutedistance);
    }

    forceTo(x, y, z, factor) {
        this.xdistance = this.x - x;
        this.ydistance = this.y - y;
        this.zdistance = this.z - z;

        this.xforce += this.xdistance * -factor / 100;
        this.yforce += this.ydistance * -factor / 100;
        this.zforce += this.zdistance * -factor / 100;
    }

    randomizeForces(factor) {
        this.xforce = (Math.random() - 0.5) * factor;
        this.yforce = (Math.random() - 0.5) * factor;
        this.zforce = (Math.random() - 0.5) * factor/10;
    }

    toLeaderPos() {
        this.x = this.leader.x;
        this.y = this.leader.y;
        this.z = this.leader.z;
        this.xforce = this.xforce * 0.001;
        this.yforce = this.yforce * 0.001;
        this.zforce = this.zforce * 0.001;
    }

    forceToDelay(pixel) {
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
    canvasColor: 'rgba(0,0,0,0.1)',

    ballColor: {
        red: "255",
        green: "255",
        blue: "255",
        alpha: "0.4"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuQmFsbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmJhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbG9yQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGUuY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDs7O0FBR0E7Ozs7QUFJQSxDQUFDLEU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDRDs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsb0JBQW9COztBQUUvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRTs7QUFFQSwyQkFBMkIsV0FBVztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixtREFBbUQ7QUFDMUU7QUFDQSwyQkFBMkIsV0FBVztBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ROQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQSxxR0FBcUc7Ozs7O0FBS3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRkFBMEY7QUFDMUYsMEZBQTBGO0FBQzFGLDBGQUEwRjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7QUMzSkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0wsRzs7Ozs7Ozs7Ozs7Ozs7QUNYQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLmpzXCIpO1xuIiwiaW1wb3J0IEJhbGwgZnJvbSAnLi9jbGFzcy5iYWxsJztcbmltcG9ydCBCYWxsQ29sbGVjdGlvbiBmcm9tICcuL2NsYXNzLkJhbGxDb2xsZWN0aW9uJztcbmltcG9ydCBDQU5WQVMgZnJvbSAnLi9tb2R1bGUuY2FudmFzJztcblxuXG5cblxuXG52YXIgYmFsbENvbGxlY3Rpb24gPSBuZXcgQmFsbENvbGxlY3Rpb24oKTtcbmJhbGxDb2xsZWN0aW9uLmFkZE11dGlwbGUoNTApO1xuYmFsbENvbGxlY3Rpb24uc2V0TGVhZGVyKHtcbiAgICB4OiBDQU5WQVMuZ2V0Q2VudGVyKCkueCxcbiAgICB5OiBDQU5WQVMuZ2V0Q2VudGVyKCkueSxcbiAgICB6OiA1MFxufSk7XG5cbmJhbGxDb2xsZWN0aW9uLnNldFRyYWNrU3BlZWQoMSk7XG5iYWxsQ29sbGVjdGlvbi5zZXRSbmRtQ29sb3JzKCk7XG5iYWxsQ29sbGVjdGlvbi5zZXRGcmljdGlvbkZhY3RvcigwLjk5OSk7XG5cblxuXG5cblxubGV0IG1haW5JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBDQU5WQVMuY2xlYXIoKTtcbiAgICBiYWxsQ29sbGVjdGlvbi5wcm9jZXNzKCk7XG4gICAgYmFsbENvbGxlY3Rpb24uZHJhd0FsbCgpO1xufSwgMzApO1xuXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblxuXG4gICAgYmFsbENvbGxlY3Rpb24ucmFuZG9taXplRm9yY2VzKDEwKTtcblxuXG5cbn0pOyIsImltcG9ydCBCYWxsIGZyb20gJy4vY2xhc3MuYmFsbCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbENvbGxlY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgfVxuXG5cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbGxBcnJheS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gQUREIEVYSVNUSU5HIEJBTExcbiAgICBhZGRCYWxsKGJhbGwpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICB9XG5cbiAgICAvLyBBREQgTkVXIEJBTExcbiAgICBhZGROZXdCYWxsKHJhZGl1cykge1xuICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKHJhZGl1cyk7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gQUREIE1VVElQTEUgQkFMTFNcbiAgICBhZGRNdXRpcGxlKGFtb3VudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFtb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKCk7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheS5wdXNoKGJhbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQUREIFJBTkRPTSBCQUxMXG4gICAgYWRkUm5kbUJhbGwocmFkaXVzKSB7XG4gICAgICAgIHZhciBiYWxsID0gbmV3IEJhbGwocmFkaXVzKTtcbiAgICAgICAgYmFsbC54Zm9yY2UgPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgYmFsbC55Zm9yY2UgPSBNYXRoLnJhbmRvbSgpICogODtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICB9XG5cbiAgICAvLyBTRVQgQ09MT1IgT0YgQUxMXG4gICAgY2hhbmdlQ29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5zZXRDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbihwaXhlbCkge1xuICAgICAgICB0aGlzLmJhbGxBcnJheS5mb3JFYWNoKChiYWxsKSA9PiB7XG4gICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKHBpeGVsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVFJBTlNMQVRFIEFMTCBCQUxMUyAoVE8gTEVBREVSIFBPUylcbiAgICB0b0xlYWRlclBvcygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS50b0xlYWRlclBvcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUFJPQ0VTUyBBTEwgQkFMTFNcbiAgICBwcm9jZXNzKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLnByb2Nlc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERSQVcgQUxMXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSQU5ET01JWkUgRk9SQ0VTIEFMTFxuICAgIHJhbmRvbWl6ZUZvcmNlcyhmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5yYW5kb21pemVGb3JjZXMoZmFjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZPUkNFIFRPIFhZXG4gICAgZm9yY2VUbyh4LCB5LCB6LCBmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5mb3JjZVRvKHgsIHksIHosIGZhY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgTEVBREVSIEZPUiBUUkFDS0lOR1xuICAgIHNldExlYWRlcihsZWFkZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5sZWFkZXIgPSBsZWFkZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBARGVwcmVjYXRlZFxuICAgIC8vIFRSQUNLIFJFTkRFUiBJTUFHRSBQSVhFTFNcbiAgICBkcmF3UmVuZGVySW1hZ2UocmVuZGVyaW1hZ2UpIHtcbiAgICAgICAgdmFyIGltYWdlcGl4ZWxzID0gcmVuZGVyaW1hZ2UucGl4ZWxzdW07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0ubGVhZGVyID0gcmVuZGVyaW1hZ2UucGl4ZWxhcnJheVtpICUgaW1hZ2VwaXhlbHNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIEZSSUNUSU9OIEZBQ1RPUlxuICAgIHNldEZyaWN0aW9uRmFjdG9yKGZhY3Rvcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmZyaWN0aW9uZmFjdG9yID0gZmFjdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIFNQRUVEXG4gICAgc2V0VHJhY2tTcGVlZChzcGVlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLnRyYWNrc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJuZG1TcGVlZChmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS50cmFja3NwZWVkID0gdGhpcy5iYWxsQXJyYXlbaV0udHJhY2tzcGVlZCAqIChmYWN0b3IgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIEFMUEhBXG4gICAgc2V0QWxwaGEoYWxwaGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5hbHBoYSA9IGFscGhhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIFJBTkRPTSBSR0IoQSlcbiAgICBzZXRSbmRtQ29sb3IoKSB7XG5cbiAgICAgICAgdmFyIHJlZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgIHZhciBncmVlbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgIHZhciBibHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaV07XG4gICAgICAgICAgICBiYWxsLnJlZCA9IHJlZDtcbiAgICAgICAgICAgIGJhbGwuZ3JlZW4gPSBncmVlbjtcbiAgICAgICAgICAgIGJhbGwuYmx1ZSA9IGJsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgICAgLy8gU0VUIFJBTkRPTSBSR0IoQSlcbiAgICAgICAgc2V0Um5kbUNvbG9ycygpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgICAgICAgICAgdmFyIGdyZWVuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICAgICAgICAgICAgICB2YXIgYmx1ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGJhbGwucmVkID0gcmVkO1xuICAgICAgICAgICAgICAgIGJhbGwuZ3JlZW4gPSBncmVlbjtcbiAgICAgICAgICAgICAgICBiYWxsLmJsdWUgPSBibHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIC8vIFNFVCBUUklBTkdMRVxuICAgIG1ha2VGb3JtKGVkZ2VzLCBkaXN0YW5jZSwgcm5kbUZhY3Rvcikge1xuXG4gICAgICAgIC8vIGZvciBsaW5lc1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpICYmIGkgKyBlZGdlcyA8PSB0aGlzLmdldFNpemUoKTsgaSArPSBlZGdlcykge1xuICAgICAgICAgICAgdmFyIGZvcm1DZW50ZXIgPSBuZXcgUGl4ZWwoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCwgTWF0aC5yYW5kb20oKSAqIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGVkZ2VzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2kgKyBqXTtcbiAgICAgICAgICAgICAgICB2YXIgYmFsbE5leHQgPSB0aGlzLmJhbGxBcnJheVtpICsgKChqICsgMSkgJSAoZWRnZXMpKV07XG4gICAgICAgICAgICAgICAgYmFsbC5mb2xsb3dlciA9IGJhbGxOZXh0O1xuICAgICAgICAgICAgICAgIGJhbGwubGVhZGVyID0gZm9ybUNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBkaXN0YW5jZXNcbiAgICAgICAgdmFyIGFuZ2xlID0gMzYwIC8gZWRnZXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCkgJiYgaSArIGVkZ2VzIDw9IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IGVkZ2VzKSB7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VSTkRNID0gZGlzdGFuY2UgKyAoKE1hdGgucmFuZG9tKCkgLSAwLjUpICogcm5kbUZhY3RvciAqIGRpc3RhbmNlICogMik7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGVkZ2VzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2kgKyBqXTtcblxuICAgICAgICAgICAgICAgIHZhciBmYWN0b3JYID0gTWF0aEQuc2luKGFuZ2xlICogaik7XG4gICAgICAgICAgICAgICAgdmFyIGZhY3RvclkgPSBNYXRoRC5jb3MoYW5nbGUgKiBqKTtcblxuICAgICAgICAgICAgICAgIHZhciB4cGx1cyA9IGZhY3RvclggKiBkaXN0YW5jZVJORE07XG4gICAgICAgICAgICAgICAgdmFyIHlwbHVzID0gZmFjdG9yWSAqIGRpc3RhbmNlUk5ETTtcbiAgICAgICAgICAgICAgICBiYWxsLmxlYWRlciA9IG5ldyBQaXhlbChiYWxsLmxlYWRlci54ICsgeHBsdXMsIGJhbGwubGVhZGVyLnkgKyB5cGx1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLy8gTUFLRSBXQVRFUlxuICAgIG1ha2VXYXRlcihwaXhlbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaV07XG4gICAgICAgICAgICBiYWxsLmZvcmNlVG9EZWxheShwaXhlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGFyayhpbnRlbnNpdHkpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkuZm9yRWFjaCgoYmFsbCkgPT4ge1xuICAgICAgICAgICAgYmFsbC5zZXRMZWFkZXIoe1xuICAgICAgICAgICAgICAgIHg6IGJhbGwueCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGludGVuc2l0eSxcbiAgICAgICAgICAgICAgICB5OiBiYWxsLnkgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBpbnRlbnNpdHlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCJpbXBvcnQgQ0FOVkFTIGZyb20gJy4vbW9kdWxlLmNhbnZhcyc7XG5pbXBvcnQgQ09MT1JfQ09ORklHIGZyb20gJy4vY29sb3JDb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSA0MDA7XG4gICAgICAgIHRoaXMueCA9IENBTlZBUy5nZXRDZW50ZXIoKS54IHwgMTAwO1xuICAgICAgICB0aGlzLnkgPSBDQU5WQVMuZ2V0Q2VudGVyKCkueSB8IDEwMDtcbiAgICAgICAgdGhpcy56ID0xMDtcbiAgICAgICAgLyogWi1BY2hzZSB2b24gMTAgYmlzIDEwMCA8LS0tIFNwZWN0YXRvciBpc3QgYXVmIDAgKi9cbiAgICAgICAgdGhpcy54Zm9yY2UgPSAwO1xuICAgICAgICB0aGlzLnlmb3JjZSA9IDA7XG4gICAgICAgIHRoaXMuemZvcmNlID0gMDtcbiAgICAgICAgdGhpcy54ZGlzdGFuY2UgPSAwO1xuICAgICAgICB0aGlzLnlkaXN0YW5jZSA9IDA7XG4gICAgICAgIHRoaXMuemRpc3RhbmNlID0gMDtcblxuICAgICAgICB0aGlzLmxlYWRlcjtcbiAgICAgICAgdGhpcy50cmFja3NwZWVkID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uZmFjdG9yID0gMTtcbiAgICAgICAgdGhpcy5mb2xsb3dlciA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5yZWQgPSBDT0xPUl9DT05GSUcuYmFsbENvbG9yLnJlZDtcbiAgICAgICAgdGhpcy5ncmVlbiA9IENPTE9SX0NPTkZJRy5iYWxsQ29sb3IuZ3JlZW47XG4gICAgICAgIHRoaXMuYmx1ZSA9IENPTE9SX0NPTkZJRy5iYWxsQ29sb3IuYmx1ZTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IENPTE9SX0NPTkZJRy5iYWxsQ29sb3IuYWxwaGE7XG5cbiAgICAgICAgLy90aGlzLnNwZWN0YXRvckRpc3RhbmNlWiA9IDEwOyAvLyA8LS0tLVxuICAgIH1cblxuICAgIGdldENvbG9yKCkge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKFwiICsgdGhpcy5yZWQgKyBcIixcIiArIHRoaXMuZ3JlZW4gKyBcIixcIiArIHRoaXMuYmx1ZSArIFwiLFwiICsgdGhpcy5hbHBoYSArIFwiKVwiO1xuICAgIH1cblxuXG4gICAgc2V0Q29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICAgICAgdGhpcy5yZWQgPSByZWQ7XG4gICAgICAgIHRoaXMuZ3JlZW4gPSBncmVlbjtcbiAgICAgICAgdGhpcy5ibHVlID0gYmx1ZTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IGFscGhhO1xuICAgIH1cblxuICAgIHNldFBvc2l0aW9uKHBpeGVsKSB7XG4gICAgICAgIHRoaXMueCA9IHBpeGVsLng7XG4gICAgICAgIHRoaXMueSA9IHBpeGVsLnk7XG4gICAgICAgIHRoaXMueiA9IHBpeGVsLno7XG4gICAgfVxuXG4gICAgc2V0TGVhZGVyKHBpeGVsKSB7XG4gICAgICAgIHRoaXMubGVhZGVyID0gcGl4ZWw7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgLy8gYnJpbmdpbmcgeiBpblxuXG4gICAgICAgIHZhciBuZXdSYWRpdXMsIG5ld1gsIG5ld1ksIG5ld0NvbG9yO1xuXG5cbiAgICAgICAgbmV3UmFkaXVzID0gdGhpcy5yYWRpdXMgLyAodGhpcy56ICsgODApO1xuXG4gICAgICAgIG5ld0NvbG9yID0gXCJyZ2JhKFwiICsgdGhpcy5yZWQgKyBcIixcIiArIHRoaXMuZ3JlZW4gKyBcIixcIiArIHRoaXMuYmx1ZSArIFwiLFwiICsgdGhpcy5hbHBoYSAgKyBcIilcIjsgLy8gKiAoMTAgLyB0aGlzLnopXG4gICAgICAgIFxuXG4gICAgICAgIFxuXG4gICAgICAgIENBTlZBUy5jdHguc3Ryb2tlU3R5bGUgPSBuZXdDb2xvcjtcbiAgICAgICAgQ0FOVkFTLmN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBDQU5WQVMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIENBTlZBUy5jdHgubGluZVRvKHRoaXMuZm9sbG93ZXIueCwgdGhpcy5mb2xsb3dlci55KTtcbiAgICAgICAgQ0FOVkFTLmN0eC5zdHJva2UoKTtcblxuICAgICAgICBDQU5WQVMuY3R4LmZpbGxTdHlsZSA9IG5ld0NvbG9yO1xuICAgICAgICBDQU5WQVMuY3R4LmJlZ2luUGF0aCgpO1xuXG5cbiAgICAgICAgQ0FOVkFTLmN0eC5hcmModGhpcy54LCB0aGlzLnksIG5ld1JhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBDQU5WQVMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy54Zm9yY2U7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlmb3JjZTtcbiAgICAgICAgdGhpcy56ICs9IHRoaXMuemZvcmNlO1xuXG4gICAgICAgIHRoaXMueGZvcmNlID0gdGhpcy54Zm9yY2UgKiB0aGlzLmZyaWN0aW9uZmFjdG9yO1xuICAgICAgICB0aGlzLnlmb3JjZSA9IHRoaXMueWZvcmNlICogdGhpcy5mcmljdGlvbmZhY3RvcjtcbiAgICAgICAgdGhpcy56Zm9yY2UgPSB0aGlzLnpmb3JjZSAqIHRoaXMuZnJpY3Rpb25mYWN0b3I7XG5cbiAgICAgICAgaWYgKHRoaXMubGVhZGVyKSB0aGlzLnRyYWNrT2JqZWN0KHRoaXMubGVhZGVyKTtcblxuICAgICAgICBpZih0aGlzLnogPD0gMTApIHtcbiAgICAgICAgICAgIHRoaXMueiA9IDEwO1xuICAgICAgICAgICAgdGhpcy56Zm9yY2UgPSAtdGhpcy56Zm9yY2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHRyYWNrT2JqZWN0KG9iamVjdCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgICAgIHRoaXMueGRpc3RhbmNlID0gdGhpcy54IC0gb2JqZWN0Lng7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gdGhpcy55IC0gb2JqZWN0Lnk7XG4gICAgICAgIHRoaXMuemRpc3RhbmNlID0gdGhpcy56IC0gb2JqZWN0Lno7XG4gICAgICAgIHZhciBhYnNvbHV0ZWRpc3RhbmNlID1cbiAgICAgICAgICAgIChNYXRoLmFicyh0aGlzLnhkaXN0YW5jZSkgKyBNYXRoLmFicyh0aGlzLnlkaXN0YW5jZSkgKyBNYXRoLmFicyh0aGlzLnpkaXN0YW5jZSkpIC8gMztcbiAgICAgICAgICAgIHRoaXMueGZvcmNlICs9ICh0aGlzLnhkaXN0YW5jZSAvIGFic29sdXRlZGlzdGFuY2UpICogLWFic29sdXRlZGlzdGFuY2UgLyAxMDAwOyAvLygtdGhpcy50cmFja3NwZWVkKSAqIGFic29sdXRlZGlzdGFuY2UgLyAxMDA7XG4gICAgICAgICAgICB0aGlzLnpmb3JjZSArPSAodGhpcy56ZGlzdGFuY2UgLyBhYnNvbHV0ZWRpc3RhbmNlKSAqIC1hYnNvbHV0ZWRpc3RhbmNlIC8gMTAwMDsgLy8oLXRoaXMudHJhY2tzcGVlZCkgKiBhYnNvbHV0ZWRpc3RhbmNlIC8gMTAwO1xuICAgICAgICAgICAgdGhpcy55Zm9yY2UgKz0gKHRoaXMueWRpc3RhbmNlIC8gYWJzb2x1dGVkaXN0YW5jZSkgKiAtYWJzb2x1dGVkaXN0YW5jZSAvIDEwMDA7IC8vKC10aGlzLnRyYWNrc3BlZWQpICogYWJzb2x1dGVkaXN0YW5jZSAvIDEwMDtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy50cmFja3NwZWVkKTtcbiAgICAgICAgLy90aGlzLnJhZGl1cyA9IE1hdGgubWluKDUsIDQwL2Fic29sdXRlZGlzdGFuY2UpO1xuICAgICAgICAvL3RoaXMuYWxwaGEgPSBNYXRoLm1pbigyNTUsIDUwIC8gYWJzb2x1dGVkaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgZm9yY2VUbyh4LCB5LCB6LCBmYWN0b3IpIHtcbiAgICAgICAgdGhpcy54ZGlzdGFuY2UgPSB0aGlzLnggLSB4O1xuICAgICAgICB0aGlzLnlkaXN0YW5jZSA9IHRoaXMueSAtIHk7XG4gICAgICAgIHRoaXMuemRpc3RhbmNlID0gdGhpcy56IC0gejtcblxuICAgICAgICB0aGlzLnhmb3JjZSArPSB0aGlzLnhkaXN0YW5jZSAqIC1mYWN0b3IgLyAxMDA7XG4gICAgICAgIHRoaXMueWZvcmNlICs9IHRoaXMueWRpc3RhbmNlICogLWZhY3RvciAvIDEwMDtcbiAgICAgICAgdGhpcy56Zm9yY2UgKz0gdGhpcy56ZGlzdGFuY2UgKiAtZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIHJhbmRvbWl6ZUZvcmNlcyhmYWN0b3IpIHtcbiAgICAgICAgdGhpcy54Zm9yY2UgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBmYWN0b3I7XG4gICAgICAgIHRoaXMueWZvcmNlID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogZmFjdG9yO1xuICAgICAgICB0aGlzLnpmb3JjZSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGZhY3Rvci8xMDtcbiAgICB9XG5cbiAgICB0b0xlYWRlclBvcygpIHtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5sZWFkZXIueDtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5sZWFkZXIueTtcbiAgICAgICAgdGhpcy56ID0gdGhpcy5sZWFkZXIuejtcbiAgICAgICAgdGhpcy54Zm9yY2UgPSB0aGlzLnhmb3JjZSAqIDAuMDAxO1xuICAgICAgICB0aGlzLnlmb3JjZSA9IHRoaXMueWZvcmNlICogMC4wMDE7XG4gICAgICAgIHRoaXMuemZvcmNlID0gdGhpcy56Zm9yY2UgKiAwLjAwMTtcbiAgICB9XG5cbiAgICBmb3JjZVRvRGVsYXkocGl4ZWwpIHtcbiAgICAgICAgdmFyIHhkaXN0YW5jZSA9IHRoaXMueCAtIHBpeGVsLng7XG4gICAgICAgIHZhciB5ZGlzdGFuY2UgPSB0aGlzLnkgLSBwaXhlbC55O1xuICAgICAgICB2YXIgYWJzb2x1dGVkaXN0YW5jZSA9IE1hdGguc3FydCh4ZGlzdGFuY2UgKiB4ZGlzdGFuY2UgK1xuICAgICAgICAgICAgeWRpc3RhbmNlICogeWRpc3RhbmNlKTtcbiAgICAgICAgdmFyIGRlbGF5ID0gYWJzb2x1dGVkaXN0YW5jZSAqIDI7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZm9yY2VGYWN0b3IgPSAxLjA7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnhmb3JjZSArPSAoeGRpc3RhbmNlIC8gKGFic29sdXRlZGlzdGFuY2UpKSAqIGZvcmNlRmFjdG9yO1xuICAgICAgICAgICAgc2VsZi55Zm9yY2UgKz0gKHlkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiBmb3JjZUZhY3RvcjtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBjYW52YXNDb2xvcjogJ3JnYmEoMCwwLDAsMC4xKScsXG5cbiAgICBiYWxsQ29sb3I6IHtcbiAgICAgICAgcmVkOiBcIjI1NVwiLFxuICAgICAgICBncmVlbjogXCIyNTVcIixcbiAgICAgICAgYmx1ZTogXCIyNTVcIixcbiAgICAgICAgYWxwaGE6IFwiMC40XCJcbiAgICB9LFxuXG5cbn07IiwiaW1wb3J0IENPTE9SX0NPTkZJRyBmcm9tICcuL2NvbG9yQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDYW52YXMoKTtcblxuXG5mdW5jdGlvbiBidWlsZENhbnZhcygpIHtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuXG4gICAgY2FudmFzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gQ09MT1JfQ09ORklHLmNhbnZhc0NvbG9yO1xuXG4gICAgY2FudmFzLmZpdFRvU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICBjYW52YXMuZ2V0Q2VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IGNhbnZhcy5oZWlnaHQgLyAyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2FudmFzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxTdHlsZSA9IENPTE9SX0NPTkZJRy5jYW52YXNDb2xvcjtcbiAgICAgICAgY2FudmFzLmN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICAvLyBGdWxsc2NyZWVuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbnZhcy5maXRUb1NjcmVlbik7XG4gICAgY2FudmFzLmZpdFRvU2NyZWVuKCk7XG4gICAgY2FudmFzLmNsZWFyKCk7XG5cbiAgICByZXR1cm4gY2FudmFzO1xufSJdLCJzb3VyY2VSb290IjoiIn0=