// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

cprequire_test(["inline:com-chilipeppr-widget-cam"], function(myWidget) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    console.log("test running of " + myWidget.id);

    $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');

    chilipeppr.load(
        "#testDivForFlashMessageWidget",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        }
    );

    // init my widget
    myWidget.init();
    $('#com-chilipeppr-widget-cam').css('padding', '10px;');

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-widget-cam", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-widget-cam", // Make the id the same as the cpdefine id
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / Template", // The descriptive name of your widget.
        desc: "This widget loads a webcam view in ChiliPeppr via WebRTC.", // A description of what your widget does
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            '/onExampleGenerate': 'Example: Publish this signal when we go to generate gcode.'
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
        },
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function() {
            console.log("I am being initted. Thanks.");

            this.setupUiFromLocalStorage();
            this.btnSetup();
            this.forkSetup();
            
            this.initCam();

            console.log("I am done being initted.");
        },
        signalling_server_hostname : "localhost", //location.hostname || "192.168.1.16",
        signalling_server_address : this.signalling_server_hostname + ':' + 443, //(location.port || 80),
        isFirefox : typeof InstallTrigger !== 'undefined', // Firefox 1.0+
        /**
         * Initialize the Cam widget
         */
        initCam: function() {
            
            // command to run on raspberry pi after installing uv4l
            // sudo uv4l -nopreview --auto-video_nr --driver uvc --device-id 1908:2311 --server-option '--use-ssl=yes' --server-option '--ssl-certificate-file=/etc/uv4l/cp.includesprivatekey.pem' -v -f
            
            // ok, here's the deal with generating certs for uv4l. run this command
            // the important part is the -nodes where no password is attached
            // to the file so that uv4l can read it in
            // sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
            //
            // for the config file, here are the key items
            // server-option = --use-ssl=yes
            // server-option = --ssl-private-key-file=/etc/uv4l/nginx.key
            // server-option = --ssl-certificate-file=/etc/uv4l/nginx.crt
            // driver = uvc
            // device-id = 1908:2311
            // auto-video_nr = yes
            //
            // and then the command line to run uv4l
            // sudo uv4l --config-file=/etc/uv4l/uv4l-cam.conf --device-id 1908:2311 -v -f

            
            /*
            addEventListener("DOMContentLoaded", function() {
                document.getElementById('signalling_server').value = signalling_server_address;
                if (!('MediaSource' in window) || location.protocol !== "https:" || !isFirefox) {
                    if (document.getElementById('cast_tab'))
                        document.getElementById('cast_tab').disabled = true;
                    document.getElementById('cast_screen').disabled = true;
                    document.getElementById('cast_window').disabled = true;
                    document.getElementById('cast_application').disabled = true;
                    document.getElementById('note2').style.display = "none";
                    document.getElementById('note4').style.display = "none";
                } else {
                    document.getElementById('note1').style.display = "none";
                    document.getElementById('note3').style.display = "none";
                }
            });
            */  
            
            window.onbeforeunload = function() {
                if (this.ws) {
                    this.ws.onclose = function () {}; // disable onclose handler first
                    this.stop();
                }
            };
            
            navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
            this.RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            this.RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
            this.RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate
            this.URL =  window.URL || window.webkitURL

            // bind button click events
            $('#com-chilipeppr-widget-cam .btn-startstreaming').click(this.onBtnStartClick.bind(this));
            $('#com-chilipeppr-widget-cam .btn-stopstreaming').click(this.onBtnStopClick.bind(this));
            this.start();

        },
        onBtnStartClick: function(evt) {
            // hide popover
            $('#' + this.id + " .btn-startstreaming").popover('hide');
            this.start();
        },
        onBtnStopClick: function(evt) {
            // hide popover
            $('#' + this.id + " .btn-stopstreaming").popover('hide');
            this.stop();
        },
        ws: null,
        pc: null, 
        audio_video_stream: null,
        pcConfig : {"iceServers": [
                {"urls": ["stun:stun.l.google.com:19302"/*, "stun:" + signalling_server_hostname + ":3478"*/]}
            ]},
        pcOptions: {
            optional: [
                {DtlsSrtpKeyAgreement: true}
            ]
        },
        mediaConstraints: {
            optional: [],
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        },
        RTCPeerConnection: {},
        RTCSessionDescription: {},
        RTCIceCandidate: {},
        URL: {},
        createPeerConnection: function() {
            try {
                var pcConfig_ = this.pcConfig;
                try {
                    this.ice_servers = document.getElementById('ice_servers').value;
                    if (this.ice_servers) {
                        pcConfig_.iceServers = JSON.parse(this.ice_servers);
                    }
                } catch (e) {
                    alert(e + "\nExample: "
                            + '\n[ {"urls": "stun:stun1.example.net"}, {"urls": "turn:turn.example.org", "username": "user", "credential": "myPassword"} ]'
                            + "\nContinuing with built-in RTCIceServer array");
                }
                console.log(JSON.stringify(pcConfig_));
                this.pc = new this.RTCPeerConnection(pcConfig_, this.pcOptions);
                this.pc.onicecandidate = this.onIceCandidate.bind(this);
                this.pc.onaddstream = this.onRemoteStreamAdded.bind(this);
                this.pc.onremovestream = this.onRemoteStreamRemoved.bind(this);
                console.log("peer connection successfully created!");
            } catch (e) {
                console.log("createPeerConnection() failed");
            }
        },

        onIceCandidate: function(event) {
            if (event.candidate) {
                var candidate = {
                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                    sdpMid: event.candidate.sdpMid,
                    candidate: event.candidate.candidate
                };
                var command = {
                    command_id: "addicecandidate",
                    data: JSON.stringify(candidate)
                };
                this.ws.send(JSON.stringify(command));
            } else {
                console.log("End of candidates.");
            }
        },

        onRemoteStreamAdded: function(event) {
            console.log("Remote stream added:", this.URL.createObjectURL(event.stream));
            var remoteVideoElement = document.getElementById('remote-video');
            remoteVideoElement.src = this.URL.createObjectURL(event.stream);
            remoteVideoElement.play();
        },

        onRemoteStreamRemoved: function(event) {
            var remoteVideoElement = document.getElementById('remote-video');
            remoteVideoElement.src = '';
        },


        server: null,
        start: function() {
            // debugger;
            if ("WebSocket" in window) {
                //document.getElementById("stop").disabled = false;
                //document.getElementById("start").disabled = true;
                $('#com-chilipeppr-widget-cam .btn-stopstreaming').prop('disabled', false);
                $('#com-chilipeppr-widget-cam .btn-startstreaming').prop('disabled', true);
                document.documentElement.style.cursor ='wait';
                this.server = document.getElementById("signalling_server").value.toLowerCase();

                var protocol = location.protocol === "https:" ? "wss:" : "ws:";
                this.ws = new WebSocket(protocol + '//' + this.server + '/stream/webrtc');

                var that = this;
                
                this.ws.onopen = function () {
                    console.log("onopen()");

                    that.audio_video_stream = null;
                    /*
                    var cast_mic = document.getElementById("cast_mic").checked;
                    var cast_tab = document.getElementById("cast_tab") ? document.getElementById("cast_tab").checked : false;
                    var cast_camera = document.getElementById("cast_camera").checked;
                    var cast_screen = document.getElementById("cast_screen").checked;
                    var cast_window = document.getElementById("cast_window").checked;
                    var cast_application = document.getElementById("cast_application").checked;
                    var echo_cancellation = document.getElementById("echo_cancellation").checked;
                    
                    var localConstraints = {};
                    if (cast_mic) {
                        if (echo_cancellation)
                            localConstraints['audio'] = { optional: [{ echoCancellation: true }] };
                        else
                            localConstraints['audio'] = { optional: [{ echoCancellation: false }] };
                    } else if (cast_tab)
                        localConstraints['audio'] = { mediaSource: "audioCapture" };
                    if (cast_camera)
                        localConstraints['video'] = true;
                    else if (cast_screen)
                        localConstraints['video'] = { frameRate: { ideal: 15, max: 30 }, mozMediaSource: "screen", mediaSource: "screen" };
                    else if (cast_window)
                        localConstraints['video'] = { frameRate: { ideal: 15, max: 30 }, mozMediaSource: "window", mediaSource: "window" };
                    else if (cast_application)
                        localConstraints['video'] = { frameRate: { ideal: 15, max: 30 }, mozMediaSource: "application", mediaSource: "application" };
                    else
                        localConstraints['audio'] = false;

                    this.localVideoElement = document.getElementById('local-video');
                    if (localConstraints.audio || localConstraints.video) {
                        if (navigator.getUserMedia) {
                            navigator.getUserMedia(localConstraints, function(stream) {
                                this.audio_video_stream = stream;
                                offer(stream);
                                this.localVideoElement.muted = true;
                                this.localVideoElement.src = this.URL.createObjectURL(stream);
                                this.localVideoElement.play();
                            }, function(error) {
                                this.stop();
                                alert("An error has occurred. Check media permissions.");
                                console.log(error);
                            });
                        } else {
                            console.log("getUserMedia not supported");
                        }
                    } else {
                        offer();
                    }
                    */
                    that.offer();
                };

                this.ws.onmessage = function (evt) {
                    var msg = JSON.parse(evt.data);
                    //console.log("message=" + msg);
                    console.log("type=" + msg.type);

                    switch (msg.type) {
                        case "offer":
                            that.pc.setRemoteDescription(new that.RTCSessionDescription(msg),
                                function onRemoteSdpSuccess() {
                                    console.log('onRemoteSdpSucces()');
                                    that.pc.createAnswer(function (sessionDescription) {
                                        that.pc.setLocalDescription(sessionDescription);
                                        var command = {
                                            command_id: "answer",
                                            data: JSON.stringify(sessionDescription)
                                        };
                                        that.ws.send(JSON.stringify(command));
                                        console.log(command);

                                    }, function (error) {
                                        alert("Failed to createAnswer: " + error);

                                    }, that.mediaConstraints);
                                },
                                function onRemoteSdpError(event) {
                                    alert('Failed to setRemoteDescription: ' + event);
                                }
                            );

                            var command = {
                                command_id: "geticecandidate"
                            };
                            console.log(command);
                            that.ws.send(JSON.stringify(command));
                            break;

                        case "answer":
                            break;

                        case "message":
                            alert(msg.data);
                            break;

                        case "geticecandidate":
                            var candidates = JSON.parse(msg.data);
                            for (var i = 0; i < candidates.length; i++) {
                                var elt = candidates[i];
                                var candidate = new that.RTCIceCandidate({sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate});
                                that.pc.addIceCandidate(candidate,
                                    function () {
                                        console.log("IceCandidate added: " + JSON.stringify(candidate));
                                    },
                                    function (error) {
                                        console.log("addIceCandidate error: " + error);
                                    }
                                );
                            }
                            document.documentElement.style.cursor ='default';
                            break;
                    }
                };

                this.ws.onclose = function (evt) {
                    if (that.pc) {
                        that.pc.close();
                        that.pc = null;
                    }
                    //document.getElementById("stop").disabled = true;
                    //document.getElementById("start").disabled = false;
                    $('#com-chilipeppr-widget-cam .btn-stopstreaming').prop('disabled', true);
                    $('#com-chilipeppr-widget-cam .btn-startstreaming').prop('disabled', false);

                    document.documentElement.style.cursor ='default';
                };

                this.ws.onerror = function (evt) {
                    alert("An error has occurred!");
                    if (that.ws) that.ws.close();
                };

            } else {
                alert("Sorry, this browser does not support WebSockets.");
            }
        },
        
        offer: function(stream) {
            this.createPeerConnection();
            if (stream) {
                this.pc.addStream(stream);
            }
            var command = {
                command_id: "offer"
            };
            this.ws.send(JSON.stringify(command));
            console.log("offer(), command=" + JSON.stringify(command));
        },

        stop: function() {
            if (this.audio_video_stream) {
                try {
                    this.audio_video_stream.stop();
                } catch (e) {
                    for (var i = 0; i < this.audio_video_stream.getTracks().length; i++)
                        this.audio_video_stream.getTracks()[i].stop();
                }
                this.audio_video_stream = null;
            }
            //document.getElementById('remote-video').src = '';
            $(this.id + " .remote-video").src = '';
            //document.getElementById('local-video').src = '';
            if (this.pc) {
                this.pc.close();
                this.pc = null;
            }
            if (this.ws) {
                this.ws.close();
                this.ws = null;
            }
            $('#' + this.id + " .btn-stopstreaming").prop('disabled', true);
            $('#' + this.id + " .btn-startstreaming").prop('disabled', false);
            //document.getElementById("stop").disabled = true;
            //document.getElementById("start").disabled = false;
            //document.documentElement.style.cursor ='default';
        },

        mute: function() {
            var remoteVideo = document.getElementById("remote-video");
            remoteVideo.muted = !remoteVideo.muted;
        },

        pause: function() {
            var remoteVideo = document.getElementById("remote-video");
            if (remoteVideo.paused)
                remoteVideo.play();
            else
                remoteVideo.pause();
        },

        fullscreen: function() {
            var remoteVideo = document.getElementById("remote-video");
            if(remoteVideo.requestFullScreen){
                remoteVideo.requestFullScreen();
            } else if(remoteVideo.webkitRequestFullScreen){
                remoteVideo.webkitRequestFullScreen();
            } else if(remoteVideo.mozRequestFullScreen){
                remoteVideo.mozRequestFullScreen();
    	    }
        },

        singleselection: function(name, id) {
            var old = document.getElementById(id).checked;
            var elements = document.getElementsByName(name);
            for(var i = 0; i < elements.length; i++) {
                elements[i].checked = false;
            }
            document.getElementById(id).checked = old ? true : false;
        },

        /**
         * Call this method from init to setup all the buttons when this widget
         * is first loaded. This basically attaches click events to your 
         * buttons. It also turns on all the bootstrap popovers by scanning
         * the entire DOM of the widget.
         */
        btnSetup: function() {

            // Chevron hide/show body
            var that = this;
            $('#' + this.id + ' .hidebody').click(function(evt) {
                console.log("hide/unhide body");
                if ($('#' + that.id + ' .panel-body').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                }
                else {
                    // hide
                    that.hideBody(evt);
                }
            });

            // Ask bootstrap to scan all the buttons in the widget to turn
            // on popover menus
            $('#' + this.id + ' .btn').popover({
                delay: 1000,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });

            // Init Say Hello Button on Main Toolbar
            // We are inlining an anonymous method as the callback here
            // as opposed to a full callback method in the Hello Word 2
            // example further below. Notice we have to use "that" so 
            // that the this is set correctly inside the anonymous method
            $('#' + this.id + ' .btn-sayhello').click(function() {
                console.log("saying hello");
                // Make sure popover is immediately hidden
                $('#' + that.id + ' .btn-sayhello').popover("hide");
                // Show a flash msg
                chilipeppr.publish(
                    "/com-chilipeppr-elem-flashmsg/flashmsg",
                    "Hello Title",
                    "Hello World from widget " + that.id,
                    1000
                );
            });

            // Init Hello World 2 button on Tab 1. Notice the use
            // of the slick .bind(this) technique to correctly set "this"
            // when the callback is called
            $('#' + this.id + ' .btn-helloworld2').click(this.onHelloBtnClick.bind(this));

        },
        /**
         * onHelloBtnClick is an example of a button click event callback
         */
        onHelloBtnClick: function(evt) {
            console.log("saying hello 2 from btn in tab 1");
            chilipeppr.publish(
                '/com-chilipeppr-elem-flashmsg/flashmsg',
                "Hello 2 Title",
                "Hello World 2 from Tab 1 from widget " + this.id,
                2000 /* show for 2 second */
            );
        },
        /**
         * User options are available in this property for reference by your
         * methods. If any change is made on these options, please call
         * saveOptionsLocalStorage()
         */
        options: null,
        /**
         * Call this method on init to setup the UI by reading the user's
         * stored settings from localStorage and then adjust the UI to reflect
         * what the user wants.
         */
        setupUiFromLocalStorage: function() {

            // Read vals from localStorage. Make sure to use a unique
            // key specific to this widget so as not to overwrite other
            // widgets' options. By using this.id as the prefix of the
            // key we're safe that this will be unique.

            // Feel free to add your own keys inside the options 
            // object for your own items

            var options = localStorage.getItem(this.id + '-options');

            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            }
            else {
                options = {
                    showBody: true,
                    tabShowing: 1,
                    customParam1: null,
                    customParam2: 1.0
                };
            }

            this.options = options;
            console.log("options:", options);

            // show/hide body
            if (options.showBody) {
                this.showBody();
            }
            else {
                this.hideBody();
            }

        },
        /**
         * When a user changes a value that is stored as an option setting, you
         * should call this method immediately so that on next load the value
         * is correctly set.
         */
        saveOptionsLocalStorage: function() {
            // You can add your own values to this.options to store them
            // along with some of the normal stuff like showBody
            var options = this.options;

            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store settings to localStorage
            localStorage.setItem(this.id + '-options', optionsStr);
        },
        /**
         * Show the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        showBody: function(evt) {
            $('#' + this.id + ' .panel-body').removeClass('hidden');
            $('#' + this.id + ' .panel-footer').removeClass('hidden');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsLocalStorage();
            }
        },
        /**
         * Hide the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        hideBody: function(evt) {
            $('#' + this.id + ' .panel-body').addClass('hidden');
            $('#' + this.id + ' .panel-footer').addClass('hidden');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsLocalStorage();
            }
        },
        /**
         * This method loads the pubsubviewer widget which attaches to our 
         * upper right corner triangle menu and generates 3 menu items like
         * Pubsub Viewer, View Standalone, and Fork Widget. It also enables
         * the modal dialog that shows the documentation for this widget.
         * 
         * By using chilipeppr.load() we can ensure that the pubsubviewer widget
         * is only loaded and inlined once into the final ChiliPeppr workspace.
         * We are given back a reference to the instantiated singleton so its
         * not instantiated more than once. Then we call it's attachTo method
         * which creates the full pulldown menu for us and attaches the click
         * events.
         */
        forkSetup: function() {
            var topCssSelector = '#' + this.id;

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 1000,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function() {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown-menu'), that);
                });
            });

        },

    }
});