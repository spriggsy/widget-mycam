# com-chilipeppr-widget-cam
This widget loads a webcam view in ChiliPeppr via WebRTC.

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Widget / Cam

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-cam |
| Name                  | Widget / Cam |
| Description           | This widget loads a webcam view in ChiliPeppr via WebRTC. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/xpix/widget-cam/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/xpix/widget-cam |
| Github URL            | http://github.com/xpix/widget-cam |
| Test URL              | https://preview.c9users.io/xpix/widget-cam/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetCam"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetCam",
  "http://raw.githubusercontent.com/xpix/widget-cam/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetCam
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-cam"], // the id you gave your widget
      function(myObjWidgetCam) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget / Cam just got loaded.", myObjWidgetCam);
        myObjWidgetCam.init();
      }
    );
  }
);

```

## Publish

This widget/element publishes the following signals. These signals are owned by this widget/element and are published to all objects inside the ChiliPeppr environment that listen to them via the 
chilipeppr.subscribe(signal, callback) method. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-pub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Subscribe

This widget/element subscribes to the following signals. These signals are owned by this widget/element. Other objects inside the ChiliPeppr environment can publish to these signals via the chilipeppr.publish(signal, data) method. 
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-sub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Foreign Publish

This widget/element publishes to the following signals that are owned by other objects. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignpub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Foreign Subscribe

This widget/element publishes to the following signals that are owned by other objects.
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Methods / Properties

The table below shows, in order, the methods and properties inside the widget/element.

  <table id="com-chilipeppr-elem-methodsprops" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Method / Property</th>
              <th>Type</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-cam"<br><br>The ID of the widget. You must define this and make it unique.</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget / Cam"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"This widget loads a webcam view in ChiliPeppr via WebRTC."</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/xpix/widget-cam/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/xpix/widget-cam"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/xpix/widget-cam"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-cam-xpix.c9users.io/widget.html"</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.<br><br>Define the publish signals that this widget/element owns or defines so that
other widgets know how to subscribe to them and what they do.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.<br><br>Define the subscribe signals that this widget/element owns or defines so that
other widgets know how to subscribe to them and what they do.</td></tr><tr valign="top"><td>foreignPublish</td><td>object</td><td>Please see docs above.<br><br>Document the foreign publish signals, i.e. signals owned by other widgets
or elements, that this widget/element publishes to.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.<br><br>Document the foreign subscribe signals, i.e. signals owned by other widgets
or elements, that this widget/element subscribes to.</td></tr><tr valign="top"><td>init</td><td>function</td><td>function () <br><br>All widgets should have an init method. It should be run by the
instantiating code like a workspace or a different widget.</td></tr><tr valign="top"><td>activate</td><td>function</td><td>function () <br><br>When this widget is activated</td></tr><tr valign="top"><td>deactivate</td><td>function</td><td>function () <br><br>When this widget is deactivated</td></tr><tr valign="top"><td>isRunningInitCheckForCam</td><td>boolean</td><td>When this widget is activated, we need to do a few things:
1. Check if there is a stored setting of what cam to connect to
because this could be a different host than what SPJS is running
on.
If no setting:
1. Check if we are SPJS connected
2. Check if we are on a Raspberry Pi
3. If so, then see if uv4l is installed
4. If so, then launch it
5. Connect
If not Raspi, show error.
If no uv4l, go into install process.</td></tr><tr valign="top"><td>initCheckForCam</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupPubSubForSpjsConnect</td><td>function</td><td>function () <br><br>Subscribe to connect/disconnect events for SPJS so we can pivot off
of it for detection.</td></tr><tr valign="top"><td>onSpjsConnect</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onSpjsDisconnect</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupInstall</td><td>function</td><td>function () <br><br>Attach all events to the install div to enable everything to work.</td></tr><tr valign="top"><td>installCamServer</td><td>function</td><td>function () <br><br>Install Cam Server</td></tr><tr valign="top"><td>sendExecRuntime</td><td>function</td><td>function () </td></tr><tr valign="top"><td>send</td><td>function</td><td>function (cmd) </td></tr><tr valign="top"><td>isAreWeSubscribedToLowLevel</td><td>boolean</td><td></td></tr><tr valign="top"><td>subscribeToLowLevelSerial</td><td>function</td><td>function () </td></tr><tr valign="top"><td>unsubscribeFromLowLevelSerial</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onWsRecv</td><td>function</td><td>function (msg) </td></tr><tr valign="top"><td>isInRaspiCheckMode</td><td>boolean</td><td></td></tr><tr valign="top"><td>raspiCapture</td><td>string</td><td></td></tr><tr valign="top"><td>isRaspberryPi</td><td>boolean</td><td></td></tr><tr valign="top"><td>checkRaspiUserCallback</td><td>object</td><td></td></tr><tr valign="top"><td>checkIfRaspberryPi</td><td>function</td><td>function (callback) </td></tr><tr valign="top"><td>checkIfRaspberryPiCallback</td><td>function</td><td>function (payload) </td></tr><tr valign="top"><td>isInCheckLinuxMode</td><td>boolean</td><td></td></tr><tr valign="top"><td>checkLinuxCallback</td><td>object</td><td></td></tr><tr valign="top"><td>checkIfLinux</td><td>function</td><td>function (callback) </td></tr><tr valign="top"><td>execruntime</td><td>object</td><td></td></tr><tr valign="top"><td>onExecRuntimeStatus</td><td>function</td><td>function (json) </td></tr><tr valign="top"><td>isSpjsStatusInitted</td><td>boolean</td><td></td></tr><tr valign="top"><td>statusCallback</td><td>object</td><td></td></tr><tr valign="top"><td>checkIfSpjsConnected</td><td>function</td><td>function (callback) </td></tr><tr valign="top"><td>requestSpjsStatus</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onRequestSpjsStatusCallback</td><td>function</td><td>function (payload) </td></tr><tr valign="top"><td>installUv4lOnRaspi</td><td>function</td><td>function () <br><br>We actually do the install here</td></tr><tr valign="top"><td>signalling_server_hostname</td><td>string</td><td>"localhost"</td></tr><tr valign="top"><td>signalling_server_address</td><td>string</td><td>"undefined:443"</td></tr><tr valign="top"><td>isFirefox</td><td>boolean</td><td></td></tr><tr valign="top"><td>initCam</td><td>function</td><td>function () <br><br>Initialize the Cam widget</td></tr><tr valign="top"><td>onBtnStartClick</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>onBtnStopClick</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>ws</td><td>object</td><td></td></tr><tr valign="top"><td>pc</td><td>object</td><td></td></tr><tr valign="top"><td>audio_video_stream</td><td>object</td><td></td></tr><tr valign="top"><td>pcConfig</td><td>object</td><td></td></tr><tr valign="top"><td>pcOptions</td><td>object</td><td></td></tr><tr valign="top"><td>mediaConstraints</td><td>object</td><td></td></tr><tr valign="top"><td>RTCPeerConnection</td><td>object</td><td></td></tr><tr valign="top"><td>RTCSessionDescription</td><td>object</td><td></td></tr><tr valign="top"><td>RTCIceCandidate</td><td>object</td><td></td></tr><tr valign="top"><td>URL</td><td>object</td><td></td></tr><tr valign="top"><td>createPeerConnection</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onIceCandidate</td><td>function</td><td>function (event) </td></tr><tr valign="top"><td>onRemoteStreamAdded</td><td>function</td><td>function (event) </td></tr><tr valign="top"><td>onRemoteStreamRemoved</td><td>function</td><td>function (event) </td></tr><tr valign="top"><td>server</td><td>object</td><td></td></tr><tr valign="top"><td>start</td><td>function</td><td>function () </td></tr><tr valign="top"><td>offer</td><td>function</td><td>function (stream) </td></tr><tr valign="top"><td>stop</td><td>function</td><td>function () </td></tr><tr valign="top"><td>mute</td><td>function</td><td>function () </td></tr><tr valign="top"><td>pause</td><td>function</td><td>function () </td></tr><tr valign="top"><td>fullscreen</td><td>function</td><td>function () </td></tr><tr valign="top"><td>singleselection</td><td>function</td><td>function (name, id) </td></tr><tr valign="top"><td>btnSetup</td><td>function</td><td>function () <br><br>Call this method from init to setup all the buttons when this widget
is first loaded. This basically attaches click events to your 
buttons. It also turns on all the bootstrap popovers by scanning
the entire DOM of the widget.</td></tr><tr valign="top"><td>showOptionsModal</td><td>function</td><td>function () </td></tr><tr valign="top"><td>options</td><td>object</td><td></td></tr><tr valign="top"><td>setupUiFromLocalStorage</td><td>function</td><td>function () <br><br>Call this method on init to setup the UI by reading the user's
stored settings from localStorage and then adjust the UI to reflect
what the user wants.</td></tr><tr valign="top"><td>saveOptionsLocalStorage</td><td>function</td><td>function () <br><br>When a user changes a value that is stored as an option setting, you
should call this method immediately so that on next load the value
is correctly set.</td></tr><tr valign="top"><td>showBody</td><td>function</td><td>function (evt) <br><br>Show the body of the panel.
<br><br><b>evt</b> ({jquery_event})  - If you pass the event parameter in, we 
know it was clicked by the user and thus we store it for the next 
load so we can reset the user's preference. If you don't pass this 
value in we don't store the preference because it was likely code 
that sent in the param.</td></tr><tr valign="top"><td>hideBody</td><td>function</td><td>function (evt) <br><br>Hide the body of the panel.
<br><br><b>evt</b> ({jquery_event})  - If you pass the event parameter in, we 
know it was clicked by the user and thus we store it for the next 
load so we can reset the user's preference. If you don't pass this 
value in we don't store the preference because it was likely code 
that sent in the param.</td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () <br><br>This method loads the pubsubviewer widget which attaches to our 
upper right corner triangle menu and generates 3 menu items like
Pubsub Viewer, View Standalone, and Fork Widget. It also enables
the modal dialog that shows the documentation for this widget.<br><br>By using chilipeppr.load() we can ensure that the pubsubviewer widget
is only loaded and inlined once into the final ChiliPeppr workspace.
We are given back a reference to the instantiated singleton so its
not instantiated more than once. Then we call it's attachTo method
which creates the full pulldown menu for us and attaches the click
events.</td></tr>
      </tbody>
  </table>


## About ChiliPeppr

[ChiliPeppr](http://chilipeppr.com) is a hardware fiddle, meaning it is a 
website that lets you easily
create a workspace to fiddle with your hardware from software. ChiliPeppr provides
a [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server) 
that you run locally on your computer, or remotely on another computer, to connect to 
the serial port of your hardware like an Arduino or other microcontroller.

You then create a workspace at ChiliPeppr.com that connects to your hardware 
by starting from scratch or forking somebody else's
workspace that is close to what you are after. Then you write widgets in
Javascript that interact with your hardware by forking the base template 
widget or forking another widget that
is similar to what you are trying to build.

ChiliPeppr is massively capable such that the workspaces for 
[TinyG](http://chilipeppr.com/tinyg) and [Grbl](http://chilipeppr.com/grbl) CNC 
controllers have become full-fledged CNC machine management software used by
tens of thousands.

ChiliPeppr has inspired many people in the hardware/software world to use the
browser and Javascript as the foundation for interacting with hardware. The
Arduino team in Italy caught wind of ChiliPeppr and now
ChiliPeppr's Serial Port JSON Server is the basis for the 
[Arduino's new web IDE](https://create.arduino.cc/). If the Arduino team is excited about building on top
of ChiliPeppr, what
will you build on top of it?

