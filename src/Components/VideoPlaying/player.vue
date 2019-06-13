<template>
<div>
  <!-- Specify our scene. -->
    <a-scene embedded style=" padding-top: 36.25%;">

        <a-entity id="text" >
        </a-entity>

        <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
        <a-videosphere id="editor" class="container" rotation="0 180 0" src="#video"  play-on-vrdisplayactivate-or-enter-vr  arrow-key-rotation artoolkit>
        </a-videosphere>

        <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
        <a-camera camera-logger position="0 0 0" user-height="0" wasd-controls-enabled="false" arrow-key-rotation>
          <a-cursor id="cursor"  color="white" fuse="true" raycaster="objects: .clickable"></a-cursor>
        </a-camera>

        <!-- Wait for the video to load. -->
        <a-assets>
            <!-- Single source video. -->
            <video id="video" style="display:none" autoplay loop crossorigin="anonymous" playsinline webkit-playsinline>
                <!-- MP4 video source. -->
                <source type="video/mp4" :src="'http://localhost:8000/assets/project/videos/'+video.src" />
            </video>
        </a-assets>

    </a-scene>
    <v-app style="height : 2em; margin-left: 1em; margin-right: 1em; background-color:#444444;">
      <v-slider v-model="valueDeterminate" color="red" @click="changeTime"></v-slider>
    </v-app>
    <v-btn fab flat style="display: inline;" class="play"><v-icon  color="white" style="cursor : pointer;"  @click="playIcon" large> {{toggle}} </v-icon></v-btn>
    <p style="display: inline;color:white;"> <b>{{Math.floor(time) | time}} / {{Math.floor(duration) | time}}</b>  </p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      toggle: 'pause',
      valueDeterminate: 0,
      time: 0,
      duration:0
    }
  },
  props: ['video'],
  computed: {
    src(){
      return this.video.src
    }
  },
  methods: {
    playIcon(){
      var vid = document.getElementById("video");
      if (this.toggle=='pause') {
          this.toggle='play_arrow'
          vid.pause()
      }else{
          this.toggle='pause'
          vid.play()
      }
    },
    changeTime(){
      var vid = document.getElementById("video");
      vid.currentTime = (this.valueDeterminate / 100)*this.duration
    }
  },
  filters: {
    time : (value)=>{
      var m = Math.floor(value / 60 )
      var s = value % 60
      if (m<10) {
        m = '0'+m
      }
      if (s<10) {
        s = '0'+s
      }
      return m + ':' + s
    }
  },
  beforeCreate() {
    let playerScript = document.createElement('script');
    playerScript.setAttribute('type',"text/javascript");
    playerScript.setAttribute('src',"/src/playerAssets/arrow-key-rotation.js");
    document.body.appendChild(playerScript);
    let playerScript1 = document.createElement('script');
    playerScript1.setAttribute('type',"text/javascript");
    playerScript1.setAttribute('src',"/src/playerAssets/play-on-vrdisplayactivate-or-enter-vr.js");
    document.body.appendChild(playerScript1);
    let playerScript2 = document.createElement('script');
    playerScript2.setAttribute('type',"text/javascript");
    playerScript2.setAttribute('src',"/src/playerAssets/hide-once-playing.js");
    document.body.appendChild(playerScript2);
    let playerScript3 = document.createElement('script');
    playerScript3.setAttribute('type',"text/javascript");
    playerScript3.setAttribute('src',"/src/playerAssets/toggle-play.js");
    document.body.appendChild(playerScript3);

    // toggle func
    AFRAME.registerComponent('toggle-visibility', {
      schema: {type: 'string'},
      init: function() {
          var entities
          setInterval(() => entities = Array.from(document.querySelectorAll(this.data)), 1);
        this.el.addEventListener('click', function (evt) {

            for (var i = 0; i < entities.length; i++) {

              if ( entities[i].object3D.visible === true ) {

                entities[i].object3D.visible = false;
              } else {

                entities[i].object3D.visible = true;
              }
            }
        });
      },
    });

    // rotate func
    AFRAME.registerComponent('rotate', {
      schema: {},
      init: function() {
          var rotation=0
          setInterval(() => {
              if (rotation==-360) {
                rotation=0
              }
              rotation--
              this.el.setAttribute('rotation','0 0 ' + rotation)
          },1);

      },
    });


  },
  mounted() {


    this.$store.dispatch('video/loadVideoScript', this.video.aFrame).then((response)=>{
        var element
        var editor = document.getElementById("editor")
        var text = document.getElementById("text")
        // console.log(response.elements.length);
        response.elements.forEach((value)=>{
          element = document.createElement(value['tagName']);
          for (const key in value) {
              if (key!='tagName') {
                element.setAttribute(key, value[key])
              }
              if (key == 'class') {
                if (value[key].includes("tag")) {
                  element.setAttribute("visible", "false")
                }

              }
          }
          editor.appendChild(element)
        })
        response.texts.forEach((value)=>{
          element = document.createElement(value['tagName']);
          for (const key in value) {
              if (key!='tagName') {
                element.setAttribute(key, value[key])
              }
              if (key == 'class') {
                if (value[key].includes("tag")) {
                  element.setAttribute("visible", "false")
                }

              }
          }
          text.appendChild(element)
        })

      })
    var vid = document.getElementById("video");
    setInterval(() => this.valueDeterminate = (vid.currentTime/vid.duration)*100, 1000);
    setInterval(() => this.time = vid.currentTime, 1000);
    setInterval(() => this.duration = vid.duration, 1);
    // vid.play()
    setInterval(() => {
        var video = document.querySelector('#editor')
        var entities = Array.from(video.querySelectorAll('.element'))
        entities.forEach((entity)=> {
          var start = entity.getAttribute('startTime')

          var end = entity.getAttribute('endTime')
          if ((this.time>=start)&&(this.time<=end)) {
              entity.object3D.visible = true;
          }else{
            entity.object3D.visible = false;
          }
        });
      }, 1);

      setInterval(() => {
        var video = document.querySelector('#text')
        var entities = Array.from(video.querySelectorAll('.element'))
        entities.forEach((entity)=> {
          var start = entity.getAttribute('startTime')

          var end = entity.getAttribute('endTime')
          if ((this.time>=start)&&(this.time<=end)) {
              entity.object3D.visible = true;
          }else{
            entity.object3D.visible = false;
          }
        });
      }, 1);

      setInterval(() => {
        var video = document.querySelector('#editor')
        for (let index = 0; index < 200; index++) {//tag numbers
            var entities = Array.from(video.querySelectorAll('.tag'+index))

            entities.forEach((entity)=> {
              var start = entity.getAttribute('startTime')
              var end = entity.getAttribute('endTime')
              if ((this.time<start)||(this.time>end)) {
                console.log(start);
                  entity.object3D.visible = false;
              }
            });
        }
      }, 1);
      setInterval(() => {
        var video = document.querySelector('#text')
        for (let index = 0; index < 200; index++) {//tag numbers
            var entities = Array.from(video.querySelectorAll('.tag'+index))

            entities.forEach((entity)=> {
              var start = entity.getAttribute('startTime')
              var end = entity.getAttribute('endTime')
              if ((this.time<start)||(this.time>end)) {
                console.log(start);
                  entity.object3D.visible = false;
              }
            });
        }
      }, 1);
  }
}
</script>
<style scoped>

</style>

