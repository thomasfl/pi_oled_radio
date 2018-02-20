Raspberry Pi Zero Internet Radio with Oled display
==================================================

 This is a simple project for the Raspberry Pi Zero with wifi, presoldiered header and the OLED display from Adafruit with buttons. Audio output i

# Requirements

 - Raspberry Pi Zero with wifi and presoldered headers
 - Adafruit OLED display bonnet with buttons
 - MicroUSB to USB adapter
 - Small USB connected soundcard
 - Raspbian OS
 - NodeJS version 9.5 or later

# Install mplayer to stream internet radio

```
$ sudo apt-get install mplayer
```

Now go on over to https://tunein.com find a radio station you fancy,
and use the development tools in your browser to get the streaming url.

If you for instance search for "BBC World Service UK", then in the
development tools in your browser you should be able to detect that
the audio is streamed from http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk_backup

From the command line you should be able to listen to the radio:

```
$ mplayer http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk_backup
```

# Install python libraries to use OLED screen

Follow the official guide for how to configure you Raspberry Pi to be able to use the [OLED display](https://learn.adafruit.com/adafruit-128x64-oled-bonnet-for-raspberry-pi/overview)

If everything is set up ok, then it should be possible to run the
python script provided in this repository to display the name of
the internet radio station and display info from the radio station
while scrolling sideways:

```
$ git clone https://github.com/thomasfl/pi_oled_radio
$ cd pi_oled_radio
$ python ./animated_display.py "BBC Radio" "Latest news bla bla"
```

# Update to latest version of node for Raspberry Pi Zero

Note that the Raspberry Pi Zero won't be able to run the same version of node as the Raspeberry Pi 3. Instead of running apt-get install we need to manually download a version of node compiled for the older ARMv6 chipset used by the Zero.

```
$ sudo apt-get remove --purge npm node nodejs
$ cd /tmp
$ wget http://nodejs.org/dist/latest-v9.x/node-v9.5.0-linux-armv6l.tar.gz
$ cd /usr/local
$ sudo tar xzvf /tmp/node-v9.5.0-linux-armv6l.tar.gz --strip=1
$ node -v
```

# Running node script to read buttons, control streaming and display

The node script will start two processes in the backround; the audio
streaming process and the animated scrolling display text process.

```
$ cd
$ mkdir scripts
$ cd scripts
$ git clone https://github.com/thomasfl/pi_oled_radio
$ cd pi_oled_radio
$ npm install
$ node index.js
```

Paths have been hardcoded so these scripts has to be placed in the folder /home/pi/scripts/pi_oled_radio to run.

# Setting up the Raspberry to run the radio on startup

Make sure the Raspberry does not start x on boot. Then add this line to
the bottom of the file ~/.bashrc:

```
/usr/bin/node /home/pi/scripts/pi_oled_radio/index.js
```

# Using the Internet Radio

Use the two "A" and "B" buttons to browse through radio stations.
Playing should start after a short while. Use the "Center" button inside
the joystick to pause streaming and display the ip address.

