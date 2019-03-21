<template>
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
        <p style="position:absolute;left:20px;"><v-icon  color="white" style="cursor : pointer;" class="play" @click="playIcon" large> {{toggle}} </v-icon></p>
    </a-scene>
</template>
<script>
export default {
  data() {
    return {
      toggle: 'pause',
    }
  },
  methods: {
    playIcon(){
      if (this.toggle=='play_arrow') {
          this.toggle='pause'
      }else{
          this.toggle='play_arrow'
      }
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
}
</script>
<style scoped>

</style>

