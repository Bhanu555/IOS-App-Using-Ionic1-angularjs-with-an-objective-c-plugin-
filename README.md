# IOS-App-Using-Ionic1-angularjs-with-an-objective-c-plugin-
Ionic cordova IOS mobile app for video visitation using an objective-c plugin 

IOS mobile app for video visitation using Ionic1/Angularjs

Steps to build an ionic1 angularjs IOS app

* Start a new ionic project by specifying its type
ionic start NewIonic1App blank --type ionic1

* Integrate cordova? - yes
* Cordova pro - no

* cd NewIOnic1App

* Add a platform: 

ionic cordova platform add ios

* Clone into this repository: 
https://github.com/jundato/cordova-plugin-twilio-video-ios

* Save the plugin in your local repository

* Next add the plugin,command to install Plugin for ionic1/angularjs :

ionic cordova plugin add [Path/to/plugin]

* copy index.html and app.js( with ng-controller function)

* Add an embedded binary framework to your project: TwilioVideoFrameWork Version 1.4.0 or 1.4.2  you can find the downloadable framework here): 

https://github.com/twilio/twilio-video-ios/releases

* Next, you will need to open your project's Linked Frameworks and Libraries configuration. You should see the TwilioVideo.framework there already. Add the following frameworks to that list:

AudioToolbox.framework
VideoToolbox.framework
AVFoundation.framework
CoreTelephony.framework
GLKit.framework
CoreMedia.framework
SystemConfiguration.framework
libc++.tbd

* Get an access token to join the room using app.js script

* Do ionic serve to check your app on safari

Connect your phone using an USB cable.

Check for USB debugging is activated!

Build your app using:

ionic cordova Build ios --device

Run your app using:
ionic cordova run ios --device

Debug/Inspect your app on the console going to: Safari --> Develop --> Your iphone 

Happy Coding! :)
