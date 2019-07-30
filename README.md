# Protecc


Protecc is a simple Graphic User Interface running over wireshark packet logger. 
It can be installed and run on any internet browser. Using Protecc, allows the user
to live capture packets in **REALTIME**. The Vue front end automically renders the packet
statistics live from firebase and render it in **REALTIME** on the user display.

## Dependencies:
Install Wirehsark as dependecy here:
<br />
<br />
https://www.wireshark.org

## Installation Guide

In the main directory folder run to start express router

```
npm run dev
```

Change directory into Protecc folder and install dependencies

```
npm install 
```
Start the app on browser by running

```
npm run dev
````

## Features:
* Packet Sniffer
To start and stop packet capture on a wireless network
* Easy to use Dashboard 
A simple dashboard where users can see all the packets logged
* User Accounts
Login with email and password or to login with google
* Statistics
Render realtime statistics from packet capture with ChartJs
* Rules Management
Allow users to create and save rules. Set rules on and off with a checkbox
* Customize settings
Turn on infinity mode for infinite packet capture or set a packet count. 
Users can also turn rules mode on and off for easy configurability.

### Live Capture:
Capturing packets from tshark and rendering statistics in realtime


![Live Capture](https://media.giphy.com/media/KxtPRZDXtO4n2sOfdM/giphy.gif)


### Setting packet count in user settings:
Setting a packet count of 100


![User customized settings - packet count](https://media.giphy.com/media/dvIzwnP5sITMYdhux4/giphy.gif)


### Capture Packet Filter feature with user customized rule:
This was run with the rule of only logging TCP Protocols


![Capture Packet Filter with Protocols](https://media.giphy.com/media/MEk8N6FA3VfztUge7i/giphy.gif)
