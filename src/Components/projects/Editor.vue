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
        <a-videosphere id="editor" class="container" rotation="0 180 0" src="#video" >
            <!-- <a-image src="/src/assets/info.png" class="clickable" toggle-visibility="#box0"  rotation="0 0 0" position="0 1 4"  side="double" animation="property: scale;  to: 1.5 1.5 1.5; loop: true; dur: 500" ></a-image> -->
            <!-- <a-box id="box0" position="0 -1 4" rotation="0 45 0" color="red" scale="1 1 1"  shadow ></a-box> -->

            <!-- <a-image src="/src/assets/Jon.png" id="image" visible="true" class="box " scale="3 3 3" position="0 -1 4"></a-image> -->
            <!-- <a-sphere position="2 -1 4" color="yellow" scale="1 1 1" ></a-sphere> -->
        </a-videosphere>

        <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
        <a-camera camera-logger position="0 0 0" wasd-controls-enabled="false"  look-controls-enabled="true" >
          <a-cursor id="cursor"  color="white" fuse="true" raycaster="objects: .clickable"></a-cursor>
          <!--fuse="true" fuseTimeout=3000  -->
        </a-camera>
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
    <v-layout>
      <!-- list of added items -->
    <v-flex xs5 style="margin-right:2em">
      <v-list dark two-line subheader>
            <v-subheader >
              Added items
              <v-icon color="green" v-if="mode==='free'">check</v-icon>
              </v-subheader>

            <v-list-tile
              v-for="shape in project.shapesList"
              :key="shape.id"
              avatar
              @click="editShape(shape.id)"
            >
              <v-list-tile-avatar>
                <v-img :src="shape.image" ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ shape.type }}</v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-btn fab flat @click="deleteElement(shape.id)"><v-icon color="red"> delete_forever</v-icon></v-btn>
            </v-list-tile>
          </v-list>
    </v-flex>
    <!-- list of added tags -->
    <v-flex xs6>
      <v-expansion-panel dark flat>
            <v-subheader >
              Added tags
              <v-spacer></v-spacer>

              <v-btn fab flat @click="addTag()"><v-icon color="green"> add_circle</v-icon></v-btn>
              </v-subheader>

            <v-expansion-panel-content
              v-for="tag in project.tagsList"
              :key="tag.id"
            >
            <template v-slot:header>
              <v-icon color="green" v-if="mode==tag.id">check</v-icon>
              <div>{{ tag.id }}</div>
              <v-btn  fab flat small  @click="tagMode(tag.id)"><v-icon color="green"> fiber_new</v-icon></v-btn>
              <v-btn  fab flat small  @click="editShape(tag.id)"><v-icon color="orange"> edit</v-icon></v-btn>
              <v-btn  fab flat small @click="deleteElement(tag.id)"><v-icon color="red"> delete_forever</v-icon></v-btn>
            </template>
                    <v-list dark two-line subheader>
                      <v-list-tile
                        v-for="shape in tag.shapes"
                        :key="shape.id"
                        avatar
                        @click="editShape(shape.id)"
                      >
                        <v-list-tile-avatar>
                          <v-img :src="shape.image" ></v-img>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title>{{ shape.type }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-btn fab flat @click="deleteElement(shape.id)"><v-icon color="red"> delete_forever</v-icon></v-btn>
                      </v-list-tile>
                    </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>

            <v-snackbar v-model="snackbar" color="red" top timeout=3000 >
              Choose an element to add to {{mode}}
              <v-btn  flat @click="snackbar = false" > <v-icon color="white"> close</v-icon> </v-btn>
            </v-snackbar>
    </v-flex>
  </v-layout>
    </v-flex>
    <!-- right menu -->
    <v-flex xs2  >
      <app-shapes :shapes="shapes" v-if="tab=='shapes'"></app-shapes>
    </v-flex>
    <v-flex xs1 >
      <v-navigation-drawer
    dark
    floating
    right
    style="width : 50%; margin-left:50%"
  >
    <v-list >
      <v-list-tile
        v-for="(item,index) in items"
        :key="index"
        style="cursor :pointer"
        @click="switchTabs(item.tab)"
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
      tab: 'shapes',
      items: [
          {icon: '3d_rotation',
          tab: 'shapes' },
          {icon: 'image' ,
          tab: 'pictures' },
          {icon: 'text_format' ,
          tab: 'text' },
          {icon: 'add_circle' ,
          tab: 'add' },
      ],
      currentShape: '',
      snackbar: false,
      mode: 'free',
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
        },
        scale: {
          size: 1
        },
        period: {
          startTime:'0',
          endTime: '0'
        }



    }
  },
  computed: {
    project(){
      return this.$store.state.project.editing
    },

    shapes() {
      return[
          {
            icon: '/src/assets/box.png',
            function: this.addBox
          },
          {
            icon :'/src/assets/sphere.png',
            function: this.addSphere
          },
          {
            icon :'/src/assets/cone.png',
            function: this.addCone
          },
          {
            icon :'/src/assets/cylinder.png',
            function: this.addCylinder
          },
          {
            icon :'/src/assets/torus.png',
            function: this.addTorus
          },
          {
            icon :'/src/assets/torus-knot.jpg',
            function: this.addTorusKnot
          },
          {
            icon :'/src/assets/dodecahedron.png',
            function: this.addDodecahedron
          },
          {
            icon :'/src/assets/tetrahedron.png',
            function: this.addTetrahedron
          },
        ]
    },
      shapesDetails() {
        return {
          tag: (this.currentShape.includes("tag")),
          position :this.position,
          rotation :this.rotation,
          material: this.material,
          scale: this.scale,
          period: this.period
        }
      },
  },
  watch: {
    rotation: {
        deep:true,
        handler(val){
          const element = document.getElementById(this.currentShape)
          element.setAttribute("rotation", val)

        }
      },
      position: {
        deep:true,
        handler(val){
          const element = document.getElementById(this.currentShape)
          element.setAttribute("position", val)
        }
      },
      material: {
        deep:true,
        handler(val){
          const element = document.getElementById(this.currentShape)
          element.setAttribute("color", val.color.toLowerCase())
        }
      },
      scale: {
        deep:true,
        handler(val){
          const element = document.getElementById(this.currentShape)
          element.setAttribute("scale", val.size+" "+val.size+" "+val.size)
        }
      },
      period: {
        deep:true,
        handler(val){
          const element = document.getElementById(this.currentShape)
          element.setAttribute("startTime", val.startTime)
          element.setAttribute("endTime", val.endTime)
          if (this.currentShape.includes("tag")) {
               const scene = document.getElementById('editor')
               var entities = Array.from(scene.querySelectorAll('.' + this.currentShape))


                entities.forEach((entity) => {
                  entity.setAttribute("startTime", val.startTime)
                  entity.setAttribute("endTime", val.endTime)
                });
          }
          // if (val.startTime>=val.endTime) {
          //   val.startTime=val.endTime-1
          // }
          // if (val.endTime>this.duration) {
          //   val.endTime=this.duration
          // }
        }
      },
  },
  methods: {
    switchTabs(tab){
      this.tab=tab
    },
    editShape(id){
      this.currentShape=id
      const shape = document.getElementById(id)
      this.position=shape.getAttribute("position")
      this.rotation=shape.getAttribute("rotation")
      this.material.color=shape.getAttribute("color")
      this.period.startTime=shape.getAttribute("startTime")
      this.period.endTime=shape.getAttribute("endTime")
      this.scale.size=shape.getAttribute("scale").charAt(0)
    },
    deleteElement(id){
      this.$store.dispatch('project/deleteElement',id)
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
    tagMode(id){
      this.snackbar=true

        this.mode=id
    },
    addTag(){
      this.$store.dispatch('project/addTag',this.duration)
    },
    addBox(){
      this.$store.dispatch('project/addBox',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addSphere(){
      this.$store.dispatch('project/addSphere',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addCone(){
      this.$store.dispatch('project/addCone',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addCylinder(){
      this.$store.dispatch('project/addCylinder',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addTorus(){
      this.$store.dispatch('project/addTorus',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addTorusKnot(){
      this.$store.dispatch('project/addTorusKnot',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addDodecahedron(){
      this.$store.dispatch('project/addDodecahedron',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
    },
    addTetrahedron(){
      this.$store.dispatch('project/addTetrahedron',{
        duration: this.duration,
        mode: this.mode
      })
      this.mode='free'
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

    this.$store.dispatch('project/loadProject', parseInt(this.$route.params.id, 10));

    // toggle func
    AFRAME.registerComponent('toggle-visibility', {
      schema: {type: 'string'},
      init: function() {
         var video = document.querySelector('#editor')
          var entities
          setInterval(() => entities = Array.from(video.querySelectorAll(this.data)), 1);
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
    var vid = document.getElementById("video");
    setInterval(() => this.valueDeterminate = (vid.currentTime/vid.duration)*100, 1000);
    setInterval(() => this.time = vid.currentTime, 1000);
    setInterval(() => this.duration = vid.duration, 1);
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
      var video = document.querySelector('#editor')
      for (let index = 0; index < this.project.tag; index++) {
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
},
}
</script>

<style scoped>

</style>

