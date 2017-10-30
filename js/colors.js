

// ----------------------------------------
//  INITIALIZATION
// ----------------------------------------

var _colors = document.getElementById("colors");
var _ctx = _colors.getContext('2d');

_colors.width = 640;
_colors.height = 400;

// ----------------------------------------
//  ANIMATION FRAMES
// ----------------------------------------

function initializeDashboard () {
	_ctx.clearRect(0, 0, _colors.width, _colors.height);

	// Draw the gauges
	drawGauge("RED");
	drawGauge("GREEN");
	drawGauge("BLUE");

	// Draw the color swatch
	_ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
	_ctx.strokeRect(X_OFFSET + ( 3 * GAUGE_SEPARATION), Y_OFFSET + 64, 128, 128);
}

function drawGauge (name) {
	var xOffset = X_OFFSET;
	var yOffset = Y_OFFSET;

	if (name === "GREEN") {
		xOffset = X_OFFSET + GAUGE_SEPARATION;
	} else if (name === "BLUE") {
		xOffset = X_OFFSET + ( 2 * GAUGE_SEPARATION );
	}

	// Draw the gauges
	_ctx.font = "12px Courier New";
	_ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
	_ctx.fillStyle = "rgba(255, 255, 255, 1.0)";

	// Draw the gauges
	_ctx.beginPath();
	_ctx.moveTo(xOffset + 10, yOffset);
	_ctx.lineTo(xOffset, yOffset);
	_ctx.lineTo(xOffset, yOffset + 255);
	_ctx.lineTo(xOffset + 10, yOffset + 255);
	_ctx.stroke();

	_ctx.fillText("255", xOffset + 15, yOffset + 3);
	_ctx.fillText("0", xOffset + 15, yOffset + 258);

	// The 128 notch
	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 128);
	_ctx.lineTo(xOffset + 10, yOffset + 128);
	_ctx.stroke();

	_ctx.fillText("128", xOffset + 15, yOffset + 131);

	// The 64 notch
	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 192);
	_ctx.lineTo(xOffset + 10, yOffset + 192);
	_ctx.stroke();

	_ctx.fillText("64", xOffset + 15, yOffset + 195);

	// The 192 notch
	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 64);
	_ctx.lineTo(xOffset + 10, yOffset + 64);
	_ctx.stroke();

	_ctx.fillText("192", xOffset + 15, yOffset + 67);

	// Extra notches
	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 32);
	_ctx.lineTo(xOffset + 5, yOffset + 32);
	_ctx.stroke();

	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 96);
	_ctx.lineTo(xOffset + 5, yOffset + 96);
	_ctx.stroke();

	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 160);
	_ctx.lineTo(xOffset + 5, yOffset + 160);
	_ctx.stroke();

	_ctx.beginPath();
	_ctx.moveTo(xOffset + 1, yOffset + 224);
	_ctx.lineTo(xOffset + 5, yOffset + 224);
	_ctx.stroke();

	_ctx.font = "18px Courier New";
	_ctx.fillText(name, xOffset - 10, yOffset + 290);
}

//
// CONSTANTS
//

var X_OFFSET = 50;
var Y_OFFSET = 50;

var ARROW_WIDTH = 10;
var ARROW_HEIGHT = 6;

var GAUGE_SEPARATION = 130;

// Min and max values for an R, G, or B value
var MIN_COLOR_VALUE = 0;
var MAX_COLOR_VALUE = 255;

var MAX_COLOR_OPACITY = 1.0;
var MIN_COLOR_OPACITY = 0.0;

// Min and max velocity used to randomize the color
var MIN_COLOR_VELOCITY = -3;
var MAX_COLOR_VELOCITY = 3;

//
// GLOBAL VARIABLES
//
var _xCoord = 0;
var _yCoord = 0;


// Generate a randomizing color
var _color = new Color({ dynamic: true });
console.log("R: " + _color.r + " G: " + _color.g + " B: " + _color.b);





function nextFrame () {
	initializeDashboard();

	_ctx.fillStyle = "rgb(" + _color.r + "," + _color.g + "," + _color.b + ")";
	_ctx.fillRect(X_OFFSET + ( 3 * GAUGE_SEPARATION ) + 1, Y_OFFSET + 65, 126, 126);

	_ctx.fillStyle = "#dddddd";

	// Mark the color's RED value on the RED gauge
	var _xCoord = X_OFFSET - 5;
	var _yCoord = Y_OFFSET + MAX_COLOR_VALUE - _color.r;

	_ctx.beginPath();
	_ctx.moveTo(_xCoord - ARROW_WIDTH, _yCoord - ARROW_HEIGHT);
	_ctx.lineTo(_xCoord, _yCoord);
	_ctx.lineTo(_xCoord - ARROW_WIDTH, _yCoord + ARROW_HEIGHT);
	_ctx.closePath();
	_ctx.fill();

	_ctx.font = "16px Courier New";
	_ctx.fillText("Δ:±" + Math.abs(_color.rV), X_OFFSET - 10, Y_OFFSET + 310);

	// Mark the color's GREEN value on the GREEN gauge
	_xCoord = X_OFFSET + GAUGE_SEPARATION - 5;
	_yCoord = Y_OFFSET + MAX_COLOR_VALUE - _color.g;

	_ctx.beginPath();
	_ctx.moveTo(_xCoord - ARROW_WIDTH, _yCoord - ARROW_HEIGHT);
	_ctx.lineTo(_xCoord, _yCoord);
	_ctx.lineTo(_xCoord - ARROW_WIDTH, _yCoord + ARROW_HEIGHT);
	_ctx.closePath();
	_ctx.fill();

	_ctx.fillText("Δ:±" + Math.abs(_color.gV), X_OFFSET + GAUGE_SEPARATION - 10, Y_OFFSET + 310);

	// Mark the color's BLUE value on the BLUE gauge
	_xCoord = X_OFFSET + ( 2 * GAUGE_SEPARATION ) - 5;
	_yCoord = Y_OFFSET + MAX_COLOR_VALUE - _color.b;

	_ctx.beginPath();
	_ctx.moveTo(_xCoord - ARROW_WIDTH, _yCoord - ARROW_HEIGHT);
	_ctx.lineTo(_xCoord, _yCoord);
	_ctx.lineTo(_xCoord - ARROW_WIDTH, _yCoord + ARROW_HEIGHT);
	_ctx.closePath();
	_ctx.fill();

	_ctx.fillText("Δ:±" + Math.abs(_color.bV), X_OFFSET + (2 * GAUGE_SEPARATION) - 10, Y_OFFSET + 310);

	_color.next();
}

function run (timestamp) {
	//console.log(timestamp);
	nextFrame();
	window.requestAnimationFrame(run);
}



function Color (config) {
	// If the object was initialized with no config, we need to create one as a fallback
	config = config || {};

	// Set the color or use the default
	this.r = config.r || MAX_COLOR_VALUE;
	this.g = config.g || MAX_COLOR_VALUE;
	this.b = config.b || MAX_COLOR_VALUE;
	this.a = config.a || MAX_COLOR_OPACITY;

	// Is this a static or a dynamic color?
	this.dynamic = config.dynamic || false;
	this.fade = config.fade || false;

	if (this.dynamic) {
		this.r = Math.round( Math.random() * MAX_COLOR_VALUE ) + 1;
		this.g = Math.round( Math.random() * MAX_COLOR_VALUE ) + 1;
		this.b = Math.round( Math.random() * MAX_COLOR_VALUE ) + 1;
	}

	// The random velocity at which a given color changes
	this.rV = Math.floor( Math.random() * ( MAX_COLOR_VELOCITY - MIN_COLOR_VELOCITY ) ) + MIN_COLOR_VELOCITY;
	this.gV = Math.floor( Math.random() * ( MAX_COLOR_VELOCITY - MIN_COLOR_VELOCITY ) ) + MIN_COLOR_VELOCITY;
	this.bV = Math.floor( Math.random() * ( MAX_COLOR_VELOCITY - MIN_COLOR_VELOCITY ) ) + MIN_COLOR_VELOCITY;

	this.isDynamic = function () {
		return this.dynamic;
	}

	this.next = function () {
		if (this.dynamic) {
			this.r += this.rV;
			this.g += this.gV;
			this.b += this.bV;

			if (this.rV > 0 && this.r > MAX_COLOR_VALUE) {
				this.r = MAX_COLOR_VALUE;
				this.rV = -this.rV;
			} else if (this.rV < 0 && this.r < MIN_COLOR_VALUE) {
				this.r = MIN_COLOR_VALUE;
				this.rV = -this.rV;
			}

			if (this.gV > 0 && this.g > MAX_COLOR_VALUE) {
				this.g = MAX_COLOR_VALUE;
				this.gV = -this.gV;
			} else if (this.gV < 0 && this.g < MIN_COLOR_VALUE) {
				this.g = MIN_COLOR_VALUE;
				this.gV = -this.gV;
			}

			if (this.bV > 0 && this.b > MAX_COLOR_VALUE) {
				this.b = MAX_COLOR_VALUE;
				this.bV = -this.bV;
			} else if (this.bV < 0 && this.b < MIN_COLOR_VALUE) {
				this.b = MIN_COLOR_VALUE;
				this.bV = -this.bV;
			}
		}
	}
}

// Kick off the animation loop
window.requestAnimationFrame(run);
