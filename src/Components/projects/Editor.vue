<template>
<div>
  <v-layout row >
    <!-- left menu -->
    <v-flex xs3 style="margin-left:2em; margin-right:2em;margin-top:2em;">
        <div>
          <shape-details :shapeDetails="shapesDetails"></shape-details>

        </div>
    </v-flex>
    <!-- video preview -->

    <v-flex xs6 style="padding-top: 1em">
      <v-layout>
      <a-scene embedded style=" padding-top: 45%;">
        <a-entity id="editor">
          <a-box id="box1" position="0 -1 -4" rotation="0 45 0" color="red" shadow ></a-box>
        </a-entity>


        <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
        <a-videosphere  rotation="0 180 0" src="#video" >

        </a-videosphere>

        <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
        <a-camera camera-logger position="0 0 0" wasd-controls-enabled="false"  look-controls-enabled="true" ></a-camera>
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
    <v-btn fab flat style="display: inline;" ><v-icon  color="white" style="cursor : pointer;"  @click="playIcon" large> {{toggle}} </v-icon></v-btn>
    <p style="display: inline;color:white;"> <b>{{Math.floor(time) | time}} / {{Math.floor(duration) | time}}</b>  </p>
    <v-btn class="play" @click="getPosition">Edit shape</v-btn>
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
import ShapeDetails from './ShapeDetails.vue'

export default {
  components: {
    appShapes: Shapes,
    shapeDetails:ShapeDetails,
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
      ],
        position: {
        x:0,
        y:0,
        z:0
        },
        rotation: {
        x:0,
        y:0,
        z:0
        },
        material: {
          color: '#194d33',
        }



    }
  },
  watch: {
    rotation: {
        deep:true,
        handler(val){
          const box = document.getElementById("box1")
          box.setAttribute("rotation", val)
        }
      },
      position: {
        deep:true,
        handler(val){
          const box = document.getElementById("box1")
          box.setAttribute("position", val)
        }
      },
      material: {
        deep:true,
        handler(val){
          const box = document.getElementById("box1")
          box.setAttribute("color", val.color.toLowerCase())
          console.log(val.color);

        }
      },
  },
  methods: {
    getPosition(){
      const box = document.getElementById("box1")
      this.position=box.getAttribute("position")
      this.rotation=box.getAttribute("rotation")
      this.material.color=box.getAttribute("color")
    },
    playIcon(){
      var vid = document.getElementById("video");
      if (this.toggle=='play_arrow') {
          this.toggle='pause'
          vid.play()
      }else{
          this.toggle='play_arrow'
          vid.pause()
      }

    },
    changeTime(){
      var vid = document.getElementById("video");
      vid.currentTime = (this.valueDeterminate / 100)*this.duration
    },
    addBox(){
      //<a-box click-drag position="-1 4 -10" rotation="0 45 0" color="red" shadow ></a-box>
      const scene = document.getElementById('editor')
      const box = document.createElement('a-box');
      box.setAttribute("click-drag", true)
      box.setAttribute("position", "-1 4 10")
      box.setAttribute("rotation", "0 45 0")
      box.setAttribute("color", "red")
      scene.appendChild(box);
    },
    addSphere(){
      const scene = document.getElementById('editor')
      const sphere = document.createElement('a-sphere');
      sphere.setAttribute("click-drag", true)
      sphere.setAttribute("position", "2 4 -10")
      sphere.setAttribute("rotation", "0 45 0")
      sphere.setAttribute("color", "red")
      scene.appendChild(sphere);
    },

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
    },
      shapesDetails() {
        return {
          position :this.position,
          rotation :this.rotation,
          material: this.material
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
    playerScript2.setAttribute('src',"/src/playerAssets/toggle-play.js");
    document.body.appendChild(playerScript2);

    window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
},
mounted() {
    var vid = document.getElementById("video");
    setInterval(() => this.valueDeterminate = (vid.currentTime/vid.duration)*100, 1000);
    setInterval(() => this.time = vid.currentTime, 1000);
    setInterval(() => this.duration = vid.duration, 1);

        const box = document.getElementById("box1")
      this.xAxe= box.getAttribute("position").x

},
}
</script>

<style scoped>

</style>

