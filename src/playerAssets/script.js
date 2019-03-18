//***************************** */
$(document).ready(function () {
  $('.valiantPhoto').Valiant360({
    crossOrigin: 'anonymous', // valid keywords: 'anonymous' or 'use-credentials'
    clickAndDrag: true, // use click-and-drag camera controls
    keyboardControls: true, // use keyboard controls (move by arrows)
    flatProjection: false, // map image to appear flat (often more distorted)
    fov: 35, // initial field of view
    fovMin: 3, // min field of view allowed
    fovMax: 100, // max field of view allowed
    hideControls: false, // hide player controls
    lon: 0, // initial lon for camera angle
    lat: 0, // initial lat for camera angle
    loop: "loop", // video loops by default
    muted: true, // video muted by default
    volume: 0.5, // video volume by default
    autoplay: true // video autoplays by default
  });
});

// play video
$('valiantPhoto').Valiant360('play');

// pause video
$('valiantPhoto').Valiant360('pause');

// load new video file
$('valiantPhoto').Valiant360('loadVideo', 'path/to/file.mp4');

// load new photo file
$('valiantPhoto').Valiant360('loadPhoto', 'path/to/file.jpg');

// destroy Valiant360 processing/resources (however, will not remove element from the dom. That is left up to you)
$('valiantPhoto').Valiant360('destroy');






(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-608903-14', 'flimshaw.net');
ga('send', 'pageview');
