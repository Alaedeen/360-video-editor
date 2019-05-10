<template>
<div>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="video in videos" :key="video.vidId" @click="watch(video.vidId)" xs2>
        <app-tile style="cursor: pointer" :vid="video"></app-tile>
      </v-flex>
    </v-layout>
  </v-container>

  <div class="text-xs-center pt-2">
    <v-pagination v-model="page" :length="pages" dark color="black" ></v-pagination>
  </div>

  <!-- Loader -->
  <v-dialog
    v-model="dialog"
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
</div>
</template>

<script>
import videoTile from './VideoPlaying/videoTile.vue'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      page : 1
    }
  },
  components: {
    appTile: videoTile
  },
  computed: {
    search(){
      return this.$store.state.video.search
    },
    dialog(){
      return this.$store.state.video.videoLoading
    },
    pages() {
      return Math.ceil(this.$store.state.video.videosCount/18)
    },
    videos(){
      if (this.search=='') {
        return this.$store.state.video.videos
      }else{
        return this.$store.state.video.filtredVideos
      }

    },
    home() {
      return this.$store.state.home.header
    }
  },
  watch: {
    search: function (val) {
      if (val=='') {
        var request = {
          offset: 0,
          limit: 18
        }
        this.$store.dispatch('video/setVideos', request)
        this.page=1
      }else{
        var request = {
          title : val,
          offset: 0,
          limit: 18
        }
        this.$store.dispatch('video/filterVideos', request)
        this.page=1
      }
    },
    page: function (val){
      if (this.search=='') {
        var request = {
          offset: (val * 18) - 18,
          limit: 18
        }
        this.$store.dispatch('video/setVideos', request)
      }else{
        var request = {
          title : this.search,
          offset: (val * 18) - 18,
          limit: 18
        }
        this.$store.dispatch('video/filterVideos', request)
      }
    }
  },
  methods: {
    watch(id){
      var url = '/watch/'+id
      this.$router.push({path:url})
    }
  },
  beforeCreate() {
    this.$store.dispatch('home/setHead',true)

    var request = {
      offset: 0,
      limit: 18
    }
    this.$store.dispatch('video/setVideos', request)
  },
  destroyed() {
    this.$store.dispatch('home/setHead',false)
  },
}
</script>

<style scoped>
  .search {
      position: absolute;
        top: 6em;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%);
}
.search * {
  outline: none;
  box-sizing: border-box;
}
.search__wrapper {
  position: relative;
}
.search__field {
  width: 50px;
  height: 50px;
  color: transparent;
  font-family: Lato, sans-serif;
  font-size: 1.35em;
  padding: 0.35em 50px 0.35em 0;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.search__field:focus {
  border-bottom-color: #ccc;
  width: 50vw;
  color: #2b2b2b;
  cursor: default;
}
.search__field:focus ~ .search__icon {
  background-color: transparent;
  cursor: pointer;
  pointer-events: auto;
}
.search__icon {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #e9f1f4;
  width: 50px;
  height: 50px;
  font-size: 1.35em;
  text-align: center;
  border-color: transparent;
  border-radius: 50%;
  pointer-events: none;
  display: inline-block;
  transition: background-color 0.2s ease-in-out;
}
.search__field::-webkit-input-placeholder {
  position: relative;
  top: 0;
  left: 0;
  transition-property: top, color;
  transition-duration: .1s;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}
.search__field:-moz-placeholder {
  position: relative;
  top: 0;
  left: 0;
  transition-property: top, color;
  transition-duration: .1s;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}
.search__field::-moz-placeholder {
  position: relative;
  top: 0;
  left: 0;
  transition-property: top, color;
  transition-duration: .1s;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}
.search__field:-ms-input-placeholder {
  position: relative;
  top: 0;
  left: 0;
  transition-property: top, color;
  transition-duration: .1s;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}
.search__field::-webkit-input-placeholder[style*=hidden] {
  color: #83b0c1;
  font-size: .65em;
  font-weight: normal;
  top: -20px;
  opacity: 1;
  visibility: visible !important;
}
.search__field:-moz-placeholder[style*=hidden] {
  color: #83b0c1;
  font-size: .65em;
  font-weight: normal;
  top: -20px;
  opacity: 1;
  visibility: visible !important;
}
.search__field::-moz-placeholder[style*=hidden] {
  color: #83b0c1;
  font-size: .65em;
  font-weight: normal;
  top: -20px;
  opacity: 1;
  visibility: visible !important;
}
.search__field:-ms-input-placeholder[style*=hidden] {
  color: #83b0c1;
  font-size: .65em;
  font-weight: normal;
  top: -20px;
  opacity: 1;
  visibility: visible !important;
}
.slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-30px);
            opacity: 0;
        }
    }
</style>


