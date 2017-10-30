/**
 * The Color object
 */
function Color (config) {
	// If the object was initialized with no config, create one as a fallback
	config = config || {};

	// Set the color or use the default
	this.r = config.r || MAX_COLOR_VALUE;
	this.g = config.g || MAX_COLOR_VALUE;
	this.b = config.b || MAX_COLOR_VALUE;

	// Static or dynamic color
	this.dynamic = config.dynamic || false;

	// If it is dynamic, set a random starting color
	if (this.dynamic) {
		this.r = Math.round( Math.random() * MAX_COLOR_VALUE ) + 1;
		this.g = Math.round( Math.random() * MAX_COLOR_VALUE ) + 1;
		this.b = Math.round( Math.random() * MAX_COLOR_VALUE ) + 1;
	}

	// The random velocity at which a given color changes
	this.rV = Math.floor( Math.random() * ( MAX_COLOR_VELOCITY - MIN_COLOR_VELOCITY ) ) + MIN_COLOR_VELOCITY;
	this.gV = Math.floor( Math.random() * ( MAX_COLOR_VELOCITY - MIN_COLOR_VELOCITY ) ) + MIN_COLOR_VELOCITY;
	this.bV = Math.floor( Math.random() * ( MAX_COLOR_VELOCITY - MIN_COLOR_VELOCITY ) ) + MIN_COLOR_VELOCITY;

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


// CONSTANTS
var X_OFFSET = 50;
var Y_OFFSET = 50;

var ARROW_WIDTH = 10;
var ARROW_HEIGHT = 6;

var GAUGE_SEPARATION = 130;

var MIN_COLOR_VALUE = 0;
var MAX_COLOR_VALUE = 255;

var MIN_COLOR_VELOCITY = -3;
var MAX_COLOR_VELOCITY = 3;

var COLORS = ["RED", "GREEN", "BLUE"];

var CANVAS = document.getElementById("colors");
var CTX = CANVAS.getContext('2d');

CANVAS.width = 640;
CANVAS.height = 400;

// The Color object
var COLOR = new Color({ dynamic: true });

// GLOBAL VARIABLES
var _xCoord = 0;
var _yCoord = 0;
var _name = "";


// Initializes the dashboard by drawing the static objects
function initializeDashboard () {
	// Clear the canvas
	clearCanvas();
	// Draw the RGB gauges
	drawGauges();
	// Draw the color swatch
	drawSwatch();
}

// Convenience function to clear the canvas
function clearCanvas () {
	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

// Convenience function to draw the swatch box
function drawSwatch () {
	CTX.strokeStyle = "rgba(255, 255, 255, 1.0)";
	CTX.strokeRect(X_OFFSET + ( 3 * GAUGE_SEPARATION), Y_OFFSET + 64, 128, 128);
}

// Convenience function to draw all three gauges
function drawGauges () {
	drawGauge(0);
	drawGauge(1);
	drawGauge(2);
}

// Takes an index and draws the gauge for the given color
function drawGauge (index) {
	// Reset the offsets
	_xCoord = X_OFFSET;
	_yCoord = Y_OFFSET;

	// Get the color name and the x-offset for this gauge
	_name = COLORS[index];
	_xCoord = X_OFFSET + (index * GAUGE_SEPARATION);

	// Setup the font and colors
	CTX.font = "12px Courier New";
	CTX.strokeStyle = "rgba(255, 255, 255, 1.0)";
	CTX.fillStyle = "rgba(255, 255, 255, 1.0)";

	// Draw the gauge
	CTX.beginPath();
	CTX.moveTo(_xCoord + 10, _yCoord);
	CTX.lineTo(_xCoord, _yCoord);
	CTX.lineTo(_xCoord, _yCoord + 255);
	CTX.lineTo(_xCoord + 10, _yCoord + 255);
	CTX.stroke();

	// Add the unit labels
	CTX.fillText("255", _xCoord + 15, _yCoord + 3);
	CTX.fillText("0", _xCoord + 15, _yCoord + 258);

	// Add the 64 notch
	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 192);
	CTX.lineTo(_xCoord + 10, _yCoord + 192);
	CTX.stroke();
	CTX.fillText("64", _xCoord + 15, _yCoord + 195);

	// Add the 128 notch
	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 128);
	CTX.lineTo(_xCoord + 10, _yCoord + 128);
	CTX.stroke();
	CTX.fillText("128", _xCoord + 15, _yCoord + 131);

	// Add the 192 notch
	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 64);
	CTX.lineTo(_xCoord + 10, _yCoord + 64);
	CTX.stroke();
	CTX.fillText("192", _xCoord + 15, _yCoord + 67);

	// Add the extra 1/8th notches
	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 32);
	CTX.lineTo(_xCoord + 5, _yCoord + 32);
	CTX.stroke();

	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 96);
	CTX.lineTo(_xCoord + 5, _yCoord + 96);
	CTX.stroke();

	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 160);
	CTX.lineTo(_xCoord + 5, _yCoord + 160);
	CTX.stroke();

	CTX.beginPath();
	CTX.moveTo(_xCoord + 1, _yCoord + 224);
	CTX.lineTo(_xCoord + 5, _yCoord + 224);
	CTX.stroke();

	// Add the color name label
	CTX.font = "18px Courier New";
	CTX.fillText(_name, _xCoord - 10, _yCoord + 290);
}

// Plots the values of the color as arrow indicators on the gauges and displays the color in the swatch
function plotValues () {
	// Fill in the swatch with the current color
	CTX.fillStyle = "rgb(" + COLOR.r + "," + COLOR.g + "," + COLOR.b + ")";
	CTX.fillRect(X_OFFSET + ( 3 * GAUGE_SEPARATION ) + 1, Y_OFFSET + 65, 126, 126);

	// Change the fill color for the indicators
	CTX.fillStyle = "#dddddd";

	// Mark the RED value on the RED gauge
	_xCoord = X_OFFSET - 5;
	_yCoord = Y_OFFSET + MAX_COLOR_VALUE - COLOR.r;

	CTX.beginPath();
	CTX.moveTo(_xCoord - ARROW_WIDTH, _yCoord - ARROW_HEIGHT);
	CTX.lineTo(_xCoord, _yCoord);
	CTX.lineTo(_xCoord - ARROW_WIDTH, _yCoord + ARROW_HEIGHT);
	CTX.closePath();
	CTX.fill();

	// Set the font and add the rate of change
	CTX.font = "16px Courier New";
	CTX.fillText("Δ:±" + Math.abs(COLOR.rV), X_OFFSET - 10, Y_OFFSET + 310);

	// Mark the GREEN value on the GREEN gauge
	_xCoord = X_OFFSET + GAUGE_SEPARATION - 5;
	_yCoord = Y_OFFSET + MAX_COLOR_VALUE - COLOR.g;

	CTX.beginPath();
	CTX.moveTo(_xCoord - ARROW_WIDTH, _yCoord - ARROW_HEIGHT);
	CTX.lineTo(_xCoord, _yCoord);
	CTX.lineTo(_xCoord - ARROW_WIDTH, _yCoord + ARROW_HEIGHT);
	CTX.closePath();
	CTX.fill();

	// Add the rate of change
	CTX.fillText("Δ:±" + Math.abs(COLOR.gV), X_OFFSET + GAUGE_SEPARATION - 10, Y_OFFSET + 310);

	// Mark the BLUE value on the BLUE gauge
	_xCoord = X_OFFSET + ( 2 * GAUGE_SEPARATION ) - 5;
	_yCoord = Y_OFFSET + MAX_COLOR_VALUE - COLOR.b;

	CTX.beginPath();
	CTX.moveTo(_xCoord - ARROW_WIDTH, _yCoord - ARROW_HEIGHT);
	CTX.lineTo(_xCoord, _yCoord);
	CTX.lineTo(_xCoord - ARROW_WIDTH, _yCoord + ARROW_HEIGHT);
	CTX.closePath();
	CTX.fill();

	// Add the rate of change
	CTX.fillText("Δ:±" + Math.abs(COLOR.bV), X_OFFSET + (2 * GAUGE_SEPARATION) - 10, Y_OFFSET + 310);
}


// The animation loop
function run (timestamp) {
	// Initialize the dashboard
	initializeDashboard();
	// Plot the values of the color
	plotValues();
	// Move to the next frame of the color
	COLOR.next();
	// Request the next frame
	window.requestAnimationFrame(run);
}


// Kick off the animation loop
window.requestAnimationFrame(run);
