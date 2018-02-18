var Gpio = require('onoff').Gpio;
var spawn = require('child_process').spawn;

var station = 0;

var stations = [
    {
	name: 'NRK Østlnd',
	url: 'http://lyd.nrk.no/nrk_radio_p1_ostlandssendingen_mp3_h'
    },
    {
	name: 'NRK Nyhet',
	url: 'http://lyd.nrk.no/nrk_radio_alltid_nyheter_mp3_h'
    },
    {
	name: 'NRK Klsisk',
	url: 'http://lyd.nrk.no/nrk_radio_klassisk_mp3_h'
    },
    {
	name: 'BBC World',
	url: 'http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk_backup'
    }
];

var streaming = null;
var display   = null;

function display_oled(str1, str2) {
    if (display) {
	display.kill('SIGINT');
    }

    display = spawn('/usr/bin/python', [
	'/home/pi/scripts/pi_oled_radio/animated_display.py',
	str1, str2
    ]);
}

function stream(station) {
    if (streaming) {
	streaming.kill('SIGINT');
    }
    streaming = spawn('mplayer', [stations[station].url]);
    display_oled(stations[station].name, 'starting...');
    var icy = "";
    
    streaming.stdout.on('data', (data) => {
	var regexp = /ICY Info: StreamTitle='([^']*)'/g;
	var match = regexp.exec(data);
	if (match) {
	    if (match[1] !== icy) {
		icy = match[1];		
		display_oled(stations[station].name, icy);
	    }
	}
    });

}

stream(0);

// L_pin = 27 
// R_pin = 23 
// C_pin = 4 
// U_pin = 17 
// D_pin = 22 
// A_pin = 5 
// B_pin = 6 

var btn_a = new Gpio(5, 'in', 'both', { persistentWatch: true });
var btn_b = new Gpio(6, 'in', 'both', { persistentWatch: true });

btn_a.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {
	station = station - 1;
	if (station === -1) {
	    station = stations.length;
	}
	console.log("Button A: -1 " + value);
	stream(0);
    }
});

btn_b.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {
	console.log("Button B: +1 ");
	station = station + 1;
	if (station > stations.length) {
	    station = 0;
	}
	stream(station);
    }
});


