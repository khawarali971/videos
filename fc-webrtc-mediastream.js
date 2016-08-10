/*
 ps-webrtc-mediastream.js
 Author: Lisa Larson-Kelley (http://learnfromlisa.com)
 Full course: WebRTC Fundamentals - Pluralsight.com
 WebRTC – Real-time Communication for Everyone Workshop - Fluent Conference 2014
 Version 1.0.0
 --
 Example of MediaStream API: getUserMedia
*/

navigator.getWebcam = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

navigator.getWebcam(
    //constraints 
    { video: true, audio: false}, 

    //successCallback
    gotWebcam,

    //errorCallback
	function(err) {
      console.log("Oops! Something's not right here." + err);
    });

function gotWebcam(stream) { 
     localVideo.src = window.URL.createObjectURL(stream);
     localVideo.play();

     //Display some of the attributes of the MediaStream and MediaStreamTrack
     //First, reach into the MediaStream object to access info about the MediaStreamTrack
     var video_track = stream.getVideoTracks()[0];

     //Show this info in a div
     var output = document.getElementById('output');
     
     //Print ID of the MediaStream object
     output.innerHTML = "<span style='font-size:30px;'>stream id = " + stream.id + "</span><BR>";
     
     //Print info about the MediaStreamTrack
     output.innerHTML += "<span style='font-size:30px;'>track readyState = " + video_track.readyState + "</span><BR>";
     output.innerHTML += "<span style='font-size:30px;'>track id = " + video_track.id + "</span><BR>";
     output.innerHTML += "<span style='font-size:30px;'>kind = " + video_track.kind + "</span><BR>";

};
