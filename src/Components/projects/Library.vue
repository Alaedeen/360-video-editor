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
export default {
  data() {
    return {
      dialog: false,
      videoName :'',
      videoFile : null,
      src: '',
      name: 'My new project',
      page : 1
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
        projectId: this.projects.length,
        userId: this.current.id,
        thumbnail: '/src/assets/video1.jpg',
        video: this.src,
        title: this.name,
        shapes: new Map([
          ['box', 0],
          ['sphere', 0],
          ['cone', 0],
          ['cylinder', 0],
          ['torus', 0],
          ['torus-knot', 0],
          ['dodecahedron', 0],
          ['tetrahedron', 0],
          ['image', 0],
          ['video', 0],
          ['text', 0],
        ]),
          tag: 0,
          shapesList: [],
          tagsList: []
        }
        this.$store.dispatch('project/addProject',newProject)
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


