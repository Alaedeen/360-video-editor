<template>
<div style="margin-top: 2em;overflow-y: scroll;overflow-x: hidden; margin-right: -5em; height: 40em">
  <label id="#bb" class="btn"> Add New Video
    <input type="file" id="File"  accept="video/*"  size="60" @change="onVideoSelected" >
  </label>

  <v-container  grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex
                xs12
                v-for="(video, index) in videoAdding.videos " :key="index"

              >
                <v-card dark flat tile style="cursor: pointer" @click="addVideo(video)" >
                    <video :src="video.src" width="230em" ></video>

                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
</div>
</template>

<script>
import Vue from 'vue'
var EventBus = new Vue()
export default {
  props: {
  videoAdding : {
    type: Object,
    default: {}
  },
  },
  data() {
    return {
      src: '',
      videoName:'',
      videoFile: null,
      ratio:''
    }
  },
  watch: {


    ratio : {
      deep: true,

      handler(val){


        var newVideo= {
              src: this.src,
              type: 'video',
              ratio : val.ratio
            }
            this.$store.dispatch('project/addVideo',newVideo)
      }
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
            const element = document.createElement('video');
            element.setAttribute("src", fr.result)
            element.addEventListener( "loadedmetadata", function (e) {
                var width = this.videoWidth
                var height = this.videoHeight
                EventBus.$emit('image-loaded',{ratio: width / height})
            }, false );
          })
        } else {
          this.videoName = ''
          this.videoFile = ''
          this.src = ''
        }


    },
    addVideo(video){
      this.$store.dispatch('project/addElement',{
        element:video,
        duration: this.videoAdding.duration,
        mode: this.videoAdding.mode.mode
      })
      this.videoAdding.mode.mode='free'
    }
  },
  created() {
    EventBus.$on('image-loaded',(data)=>{
          this.ratio=data

        })


  },

}
</script>

<style scoped>
label{
    margin-left: 25%;
    padding: 10px;
    background: red;
    display: table;
    color: #fff;
     }



input[type="file"] {
    display: none;
}
</style>

