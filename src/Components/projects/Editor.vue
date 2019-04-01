<template>
<div>
  <v-layout row >
    <!-- left menu -->
    <v-flex xs2>

    </v-flex>
    <!-- video preview -->

    <v-flex xs7 style="padding-top: 1em">
      <v-layout>
      <a-scene embedded style=" padding-top: 45%;">


        <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
        <a-videosphere id="editor" rotation="0 180 0" src="#video"  play-on-vrdisplayactivate-or-enter-vr   artoolkit >
          <!-- <a-box id="editor" position="-1 4 -10" rotation="0 45 0" color="red" shadow  ></a-box> -->
        </a-videosphere>
        <!-- Wait for the video to load. -->
        <a-assets>
            <!-- Single source video. -->
            <video id="video" style="display:none" crossorigin="anonymous" playsinline webkit-playsinline>
                <!-- MP4 video source. -->
                <source type="video/mp4" src="/src/playerAssets/London Park.mp4" />
            </video>
        </a-assets>
    </a-scene>
    </v-layout>
    <!-- video controllers -->
    <v-app style="height : 2em; margin-left: 1em; margin-right: 1em; background-color:#444444; margin-bottom: 1em;">
      <v-slider v-model="valueDeterminate" color="red" @click="changeTime"></v-slider>
    </v-app>
    <v-btn fab flat style="display: inline;" class="play"><v-icon  color="white" style="cursor : pointer;"  @click="playIcon" large> {{toggle}} </v-icon></v-btn>
    <p style="display: inline;color:white;"> <b>{{Math.floor(time) | time}} / {{Math.floor(duration) | time}}</b>  </p>


    </v-flex>
    <!-- right menu -->
    <v-flex xs2  >
      <app-shapes :shapes="shapes"></app-shapes>
    </v-flex>
    <v-flex xs1 >
      <v-navigation-drawer
    dark
    floating
    right
    style="width : 50%; margin-left:50%"
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        style="cursor :pointer"
      >
        <v-btn fab flat style="left : -1.6em">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    </v-flex>
  </v-layout>

</div>
</template>

<script>
import Shapes from './shapes.vue'
export default {
  components: {
    appShapes: Shapes
  },
  data() {
    return {
      toggle: 'play_arrow',
      valueDeterminate: 0,
      time: 0,
      duration:0,
      items: [
          {icon: 'dashboard' },
          {icon: 'account_box' },
          {icon: 'gavel' }
        ]
    }
  },
  methods: {
    playIcon(){
      if (this.toggle=='play_arrow') {
          this.toggle='pause'
      }else{
          this.toggle='play_arrow'
      }
    },
    changeTime(){
      var vid = document.getElementById("video");
      vid.currentTime = (this.valueDeterminate / 100)*this.duration
    },
    addBox(){
      //<a-box position="-1 4 -10" rotation="0 45 0" color="red" shadow ></a-box>
      const scene = document.getElementById('editor')
      const box = document.createElement('a-box');
      box.setAttribute("position", "-1 4 10")
      box.setAttribute("rotation", "0 45 0")
      box.setAttribute("color", "red")
      scene.appendChild(box);
    },
    addSphere(){
      const scene = document.getElementById('editor')
      const box = document.createElement('a-sphere');
      box.setAttribute("position", "2 4 -10")
      box.setAttribute("rotation", "0 45 0")
      box.setAttribute("color", "red")
      scene.appendChild(box);
    }
  },
  computed: {
    shapes() {
      return[
          {
            icon: '/src/assets/box.png',
            function: this.addBox
          },
          {
            icon :'/src/assets/sphere.png',
            function: this.addSphere
          }
        ]
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
    let playerScript3 = document.createElement('script');
    playerScript3.setAttribute('type',"text/javascript");
    playerScript3.setAttribute('src',"/src/playerAssets/toggle-play.js");
    document.body.appendChild(playerScript3);
},
mounted() {
    var vid = document.getElementById("video");
    setInterval(() => this.valueDeterminate = (vid.currentTime/vid.duration)*100, 1000);
    setInterval(() => this.time = vid.currentTime, 1000);
    setInterval(() => this.duration = vid.duration, 1);
},
}
</script>

<style scoped>

</style>

