<template>
<div>
  <v-layout row >
    <!-- left menu -->
    <v-flex xs3 style="margin-left:2em; margin-right:2em;margin-top:2em;">
        <div>
          <b style="color: white; font-size : 1.5em; ">Editing : {{currentShape}} </b>
          <shape-details :shapeDetails="shapesDetails"></shape-details>
        </div>
    </v-flex>
    <!-- video preview -->

    <v-flex xs6 style="padding-top: 1em">
      <v-layout>
      <a-scene embedded style=" padding-top: 45%;" vr-mode-ui="enabled: false">

        <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
        <a-videosphere id="editor"  rotation="0 180 0" src="#video" >
            <!-- <a-box id="box1" position="0 -1 4" rotation="-90 0 0" color="red"  shadow ></a-box> -->
        </a-videosphere>

        <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
        <a-camera camera-logger position="0 0 0" wasd-controls-enabled="false"  look-controls-enabled="true" ></a-camera>
        <!-- Wait for the video to load. -->
        <a-assets>
            <!-- Single source video. -->
            <video id="video" style="display:none" crossorigin="anonymous" playsinline webkit-playsinline>
                <!-- MP4 video source. -->
                <source type="video/mp4" src="/src/assets/Pods-360.mp4" />
            </video>
        </a-assets>
    </a-scene>
    </v-layout>
    <!-- video controllers -->
    <v-flex xs12>
      <v-app style="height : 2em; margin-left: 1em; margin-right: 1em; background-color:#444444; margin-bottom: 1em;">
      <v-slider v-model="valueDeterminate" color="red" @click="changeTime"></v-slider>
      </v-app>
    </v-flex>
    <v-flex xs12>
    <v-btn fab flat style="display: inline;" ><v-icon  color="white" style="cursor : pointer;"  @click="playIcon" large> {{toggle}} </v-icon></v-btn>
    <p style="display: inline;color:white;"> <b>{{Math.floor(time) | time}} / {{Math.floor(duration) | time}}</b>  </p>
    </v-flex>
    <v-flex xs12>
      <v-list dark two-line subheader>
            <v-subheader >Added items</v-subheader>

            <v-list-tile
              v-for="shape in shapesList"
              :key="shape"
              avatar
              @click="editShape(shape.id)"
            >
              <v-list-tile-avatar>
                <v-img :src="shape.image" ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ shape.type }}</v-list-tile-title>
                <v-list-tile-sub-title>from :  to : </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
    </v-flex>

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
      box : 0,
      sphere:0,
      shapesList: [],
      currentShape: '',
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
  watch: {
    rotation: {
        deep:true,
        handler(val){
          const box = document.getElementById(this.currentShape)
          box.setAttribute("rotation", val)
        }
      },
      position: {
        deep:true,
        handler(val){
          const box = document.getElementById(this.currentShape)
          box.setAttribute("position", val)
        }
      },
      material: {
        deep:true,
        handler(val){
          const box = document.getElementById(this.currentShape)
          box.setAttribute("color", val.color.toLowerCase())
        }
      },
  },
  methods: {
    editShape(id){
      this.currentShape=id
      const box = document.getElementById(id)
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
      box.setAttribute("position", "0 -1 4")
      box.setAttribute("rotation", "0 45 0")
      box.setAttribute("color", "red")
      box.setAttribute("id", "box"+ this.box)
      scene.appendChild(box);
      this.shapesList.splice(0,0,{
        image : '/src/assets/box.png',
        type: 'box '+this.box,
        id: 'box'+this.box
      }),
      this.box++
    },
    addSphere(){
      const scene = document.getElementById('editor')
      const sphere = document.createElement('a-sphere');
      sphere.setAttribute("position", "2 4 -10")
      sphere.setAttribute("rotation", "0 45 0")
      sphere.setAttribute("color", "red")
      scene.appendChild(sphere);
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

},
}
</script>

<style scoped>

</style>

