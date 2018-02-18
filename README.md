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
$ python ./animated_display.py "BBC Radio" "Latest news bla bla"
```

# Update to latest version of node

Follow this guide on how to [upgrade NodeJS](http://thisdavej.com/upgrading-to-more-recent-versions-of-node-js-on-the-raspberry-pi/).

# Running node script to read buttons, control streaming and display

The node script will start two processes in the backround; the audio
streaming process and the animated scrolling display text process.

# Setting up the Raspberry to run the radio on startup

Make sure the Raspberry does not start x on boot. Then add this line to
the bottom of the file ~/.bashrc:

```
/usr/bin/node /home/pi/scripts/pi_oled_radio/index.js
```


