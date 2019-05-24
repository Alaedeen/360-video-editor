<template>
<div>
  <v-btn absolute dark right  style="margin : 1em " color="red" @click.stop="dialog = true" >Add new video <v-icon>fiber_new</v-icon></v-btn>
   <v-container grid-list-md text-xs-center style="margin-top: 4em">
      <v-layout row wrap>
        <v-flex v-for="project in projects" :key="project.projectId"  xs2>
          <app-tile  :project="project"></app-tile>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-xs-center pt-2" v-if="pages!=0">
      <v-pagination v-model="page" :length="pages" dark color="black" ></v-pagination>
    </div>

    <!-- Loader -->
    <v-dialog
      v-model="dialog1"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="blue"
        dark
      >
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="black"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <video id="main-video" style="visibility: hidden;" controls>
      <source type="video/mp4">
    </video>
    <canvas id="video-canvas" style="visibility: hidden;"></canvas>

    <v-dialog
        v-model="dialog"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Add a new video</v-card-title>
          <v-flex xs12 style="padding-left: 1em;padding-right: 1em;">
            <v-text-field
              label="Project Name"
              v-model="name"
            ></v-text-field>
          </v-flex>
          <label id="#bb" class="btn" > Select a video
            <input type="file" id="File" accept="video/*"  size="60" @change="onVideoSelected" >
          </label>
          <p style="margin-left :1em" ><b> {{videoName}} </b></p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="confirm"
            >
              Add
            </v-btn>
            <v-btn
              color="red darken-1"
              flat="flat"
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</div>
</template>

<script>
import projectTile from './projectTile.vue'
import Vue from 'vue'
var EventBus = new Vue()
export default {
  data() {
    return {
      dialog: false,
      videoName :'',
      videoFile : null,
      src: '',
      name: 'My new project',
      page : 1,
      thumbnail:null
    }
  },
components: {
    appTile: projectTile
  },
  computed: {
    projects(){
        return this.$store.state.project.projects
    },
    current() {
      return this.$store.state.user.current
    },
    dialog1(){
      return this.$store.state.project.projectLoading
    },
    pages() {
      return Math.ceil(this.$store.state.project.projectCount/18)
    }
  },
  methods: {
    onVideoSelected(event){
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }


        const files = event.target.files
        if(files[0] !== undefined) {
          this.videoName = files[0].name

          if(this.videoName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.src = fr.result
            this.videoFile = files[0] // this is an video file that can be sent to server...
            var video = document.querySelector("#main-video");
            document.querySelector("#main-video source").setAttribute('src', URL.createObjectURL(files[0]));
            var canvas = document.querySelector("#video-canvas")
            video.load()
            video.addEventListener('loadedmetadata', function () {
              canvas.width=video.videoWidth
              canvas.height=video.videoHeight
              video.currentTime = Math.floor( Math.random()*video.duration)
              console.log(video.currentTime);

              var ctx = canvas.getContext("2d")
              ctx.drawImage(video,0,0,video.videoWidth,video.videoHeight)
              var thumbnail= dataURLtoFile(canvas.toDataURL(), "thumbnail.png");
              EventBus.$emit('image-loaded',{thumb: thumbnail})

            })

          })


        } else {
          this.videoName = ''
          this.videoFile = ''
          this.src = ''
        }
    },
    confirm(){
      if (this.videoFile!=null) {
        this.dialog = false
        var newProject= {
        userId: this.current.id,
        thumbnail: this.thumbnail,
        video: this.videoFile,
        title: this.name
        }
        this.$store.dispatch('project/addProject',newProject).then(()=>{
          var request = {
            id: this.current.id,
            offset: 0,
            limit: 18
          }
          this.$store.dispatch('project/setProjects', request)
        })
      }
    }
  },
  mounted() {
    var request = {
      id: this.current.id,
      offset: 0,
      limit: 18
    }
    this.$store.dispatch('project/setProjects', request)
  },
  created() {
    EventBus.$on('image-loaded',(data)=>{
      this.thumbnail=data.thumb

    })
  },
}
</script>

<style scoped>
label{
    margin-left: 5%;
    padding: 10px;
    background: red;
    display: table;
    color: #fff;
     }



input[type="file"] {
    display: none;
}
</style>


