AFRAME.registerComponent('artoolkit', {
  init: function () {
    var sceneEl = document.querySelector('a-scene').querySelector('a-assets');
    var video = sceneEl.querySelector('video');
    var canvas = document.getElementsByClassName('play');
    canvas[0].addEventListener('click', function () {
      if (video.paused == true) {
        video.play();
      } else {
        video.pause();
      }
    }, false);
  }
});
