<template>
<div style="margin-top: 2em; overflow-y: scroll;overflow-x: hidden; margin-right: -5em; height: 40em">
  <label id="#bb" class="btn"> Add New Picture
    <input type="file" id="File" accept="image/*"  size="60" @change="onImageSelected" >
  </label>
  <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex
                xs6
                v-for="(picture, index) in pictureAdding.pictures" :key="index"
              >
                <v-card flat tile>
                  <v-img
                    style="cursor:pointer"
                    :src="picture.src"
                    class="white lighten-2"
                    @click="addPicture(picture)"
                  ></v-img>

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
  pictureAdding : {
    type: Object,
    default: {}
  },
  },
  data() {
    return {
      src: '',
      imageName:'',
      imageFile: null,
      ratio:0
    }
  },
  computed: {
    current() {
      return this.$store.state.user.current
    },
  },
  watch: {
    ratio : {
      deep: true,
      handler(val){
           var newImage= {
              picture: this.imageFile,
              type: 'image',
              ratio: this.ratio.ratio,
              userId : this.current.id
            }
            this.$store.dispatch('project/addPicture',newImage).then(()=>{
              var request1 = {
                id: this.current.id,
                offset : 0,
                limit : 20
              }
              this.$store.dispatch('project/initPictures', request1);
            })
      }
    }
  },
  created() {
        EventBus.$on('image-loaded',(data)=>{
          this.ratio=data
        })
  },
  methods: {
      onImageSelected(event){
      const files = event.target.files
      var ratio=0
			if(files[0] !== undefined) {
        this.imageName = files[0].name
        var _URL = window.URL || window.webkitURL;
        var img = new Image();
        img.onload =  function () {
          EventBus.$emit('image-loaded',{ratio:( this.width / this.height)})
        }
        img.src = _URL.createObjectURL(files[0])
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
        const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
          this.src = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
        })
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.src = ''
      }
    },
    addPicture(picture){
      this.$store.dispatch('project/addElement',{
        element:picture,
        duration: this.pictureAdding.duration,
        mode: this.pictureAdding.mode.mode
      })
      this.pictureAdding.mode.mode='free'
      this.$store.dispatch('project/setSaving',false)
    }
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

