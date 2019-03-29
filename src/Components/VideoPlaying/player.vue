<template>
<div>
  <!-- Specify our scene. -->
    <a-scene embedded style=" padding-top: 36.25%;">
        <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
        <a-videosphere rotation="0 180 0" src="#video"  play-on-vrdisplayactivate-or-enter-vr  arrow-key-rotation artoolkit>
        </a-videosphere>

        <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
        <a-camera user-height="0" wasd-controls-enabled="false" arrow-key-rotation>

        </a-camera>

        <!-- Wait for the video to load. -->
        <a-assets>
            <!-- Single source video. -->
            <video id="video" style="display:none" autoplay loop crossorigin="anonymous" playsinline webkit-playsinline>
                <!-- MP4 video source. -->
                <source type="video/mp4" src="/src/playerAssets/London Park.mp4" />
            </video>
        </a-assets>

    </a-scene>
    <v-app style="height : 2em; margin-left: 1em; margin-right: 1em; background-color:#444444;">
      <v-slider v-model="valueDeterminate" color="red"></v-slider>
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
  watch: {
    // valueDeterminate: (val)=>{
    //   var vid = document.getElementById("video");
    //   vid.currentTime=10
    // }
  },
  methods: {
    playIcon(){
      if (this.toggle=='play_arrow') {
          this.toggle='pause'
      }else{
          this.toggle='play_arrow'
      }
    },
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



  },
  mounted() {
  //start with this
    var vid = document.getElementById("video");
    setInterval(() => this.valueDeterminate = (vid.currentTime/vid.duration)*100, 1);
    setInterval(() => this.time = vid.currentTime, 1000);
    setInterval(() => this.duration = vid.duration, 1);
    vid.play()
  }
}
</script>
<style scoped>

</style>

