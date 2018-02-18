var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

// L_pin = 27 
// R_pin = 23 
// C_pin = 4 
// U_pin = 17 
// D_pin = 22 

// A_pin = 5 
// B_pin = 6 

var btn_a = new Gpio(5, 'in', 'both', {
    persistentWatch: true
});
var btn_b = new Gpio(6, 'in', 'both', {
    persistentWatch: true
});

// var btn_a = new Gpio(5, 'in', 'both');
// var btn_b = new Gpio(6, 'in', 'both');

btn_b.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {
	console.log("Button B: " + value);
    }
});

btn_a.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {
	console.log("Button a: " + value);
    }
});

