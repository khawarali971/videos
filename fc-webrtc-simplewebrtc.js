/*
 ps-webrtc-simplewebrtc.js
 Author: Lisa Larson-Kelley (http://learnfromlisa.com)
 Full course: WebRTC Fundamentals - Pluralsight.com
 WebRTC – Real-time Communication for Everyone Workshop - Fluent Conference 2014
 Version 1.0.0
 --
 Example of basic multiway conferencing with SimpleWebRTC framework
 Adapted from SimpleWebRTC documentation 
 */

window.onload = function () { 
            // grab the room from the URL
            var room = location.search && location.search.split('?')[1];

            // create our webrtc connection
            var webrtc = new SimpleWebRTC({
                // the id/element dom element that will hold "our" video
                localVideoEl: 'localVideo',
                // the id/element dom element that will hold remote videos
                remoteVideosEl: 'remotes',
                // immediately ask for camera access
                autoRequestMedia: true,
                log: true
            });

            // when it's ready, join if we got a room from the URL
            webrtc.on('readyToCall', function () {
                // you can name it anything
                if (room) webrtc.joinRoom(room);
            });
            
            // Since we use this twice we put it here
            function setRoom(name) {
                $('form').remove();
                $('h1').text('Welcome to room: ' + name);
                $('#subTitle').text('Share this link to have friends join you:');
                $('#roomLink').text(location.href);
                $('body').addClass('active');
            }

            if (room) {
                setRoom(room);
            } else {
                $('form').submit(function () {
                    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
                    webrtc.createRoom(val, function (err, name) {
                        var newUrl = location.pathname + '?' + name;
                        if (!err) {
                            history.replaceState({foo: 'bar'}, null, newUrl);
                            setRoom(name);
                        }
                    });
                    return false;          
                });
            }

            var button = $('#screenShareButton'),
                setButton = function (bool) {
                    button.text(bool ? 'share screen' : 'stop sharing');
                };

            setButton(true);

            if (!webrtc.screenSharingSupport) {
                button[0].disabled = true;
            } else {
                button.click(function () {
                    if (webrtc.localScreen) {
                        webrtc.stopScreenShare();
                        setButton(true);
                    } else {
                        webrtc.shareScreen();
                        setButton(false);
                    }
                });
            }

        }
        