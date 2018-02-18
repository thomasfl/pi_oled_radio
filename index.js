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
	name: 'NRK P3',
	url: 'http://lyd.nrk.no/nrk_radio_p3_mp3_h'
    },
    {
	name: 'NRK Klsisk',
	url: 'http://lyd.nrk.no/nrk_radio_klassisk_mp3_h'
    },
    {
	name: 'BBC World',
	url: 'http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk_backup'
    },
    {
	name: 'Otto\'s',
	url: 'http://strm112.1.fm/baroque_mobile_mp3'
    },
    {
	name: 'Audiophile',
	url: 'http://strm112.1.fm/baroque_mobile_mp3'
    },
    {
	name: 'Audiophile',
	url: 'http://strm112.1.fm/baroque_mobile_mp3'
    },
    
];

var streaming = null;
var display   = null;

function display_oled(str1, str2) {
    if (display) {
	display.kill('SIGKILL');
    }

    display = spawn('/usr/bin/python', [
	'/home/pi/scripts/pi_oled_radio/animated_display.py',
	str1, str2
    ]);
}

function stream(station) {
    if (streaming) {
	streaming.kill('SIGKILL');
    }
    streaming = spawn('mplayer', [stations[station].url]);
    display_oled(stations[station].name, '');
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

var sysinfo;
function display_sysinfo() {
    if (sysinfo) {
	sysinfo.kill('SIGKILL');
    }
    sysinfo = spawn('/bin/bash', [
	'/home/pi/scripts/pi_oled_radio/ip_address.sh']);    
    sysinfo.stdout.on('data', (data) => {
	display_oled("IP:", data);
	// sysinfo.kill('SIGKILL');
    });
}

stream(station);

// L_pin = 27 
// R_pin = 23 
// C_pin = 4 
// U_pin = 17 
// D_pin = 22 
// A_pin = 5 
// B_pin = 6 

var btn_a = new Gpio(5, 'in', 'both', { persistentWatch: true });
var btn_b = new Gpio(6, 'in', 'both', { persistentWatch: true });
var btn_c = new Gpio(4, 'in', 'both', { persistentWatch: true });

// var btn_up = new Gpio(17, 'in', 'both', { persistentWatch: true });

btn_a.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {
	station = station - 1;
	if (station < 0) {
	    station = stations.length - 1;
	}
	stream(station);
    }
});

btn_b.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {
	station = station + 1;
	if (station > (stations.length-1)) {
	    station = 0;
	}
	stream(station);
    }
});

btn_c.watch( function(err, value) {
    if(err) {
	throw err;
    }
    if (value === 1 ) {	
	display_sysinfo();
	if (streaming) {
	    streaming.kill('SIGKILL');
	} else {
	    stream(station);	    
	}
    }
});
