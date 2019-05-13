<template>

<div >

    <v-layout row wrap>
    <v-flex xs12 sm12 md12 lg12 xl12 style="paddingBottom: 2em;">
      <!-- video player -->
        <app-player  ></app-player>
        <!-- video player end-->
    </v-flex>
    <v-flex xs12  md8  style="paddingLeft: 3em; paddingTop: 1em">
      <!-- video details -->
          <app-details :video="video" ></app-details>
      <!-- video details end-->

      <!-- comments -->
      <app-comments :comments="video.comments" :videoId="video.vidId" ></app-comments>
      <!-- comments end -->
    </v-flex>
    <v-flex xs12  md4  >
      <h5 style="marginLeft: 1em; color: white"> Watch next</h5>
      <!-- watch  next -->
          <app-next v-for="(vid, index) in videos" :key="index"  :video="vid" :playingId="video.vidId"></app-next>
      <!-- watch next end -->
    </v-flex>
    </v-layout>

</div>
</template>

<script>
import player from './player.vue'
import details from './playingVideoDetails.vue'
import comments from './videoComments.vue'
import next from './watchNext.vue'
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions({
      getAccount : 'user/visitAccount'
    }),
  },
  computed: {
    video(){
      return this.$store.state.video.playing
    },
    videos(){
      return this.$store.state.video.videos
    },
  },
  mounted() {
    this.$store.dispatch('video/loadVideo', parseInt(this.$route.params.id, 10)).then(()=>{
      this.getAccount(this.video.userId)
    })

  },
  components: {
    appPlayer: player,
    appDetails: details,
    appComments: comments,
    appNext: next
  }

}
</script>

<style scoped>
.name{
  padding-left: 1em;
  color : white
}
.profile{
      width: 100%;
      background-color: 	#444444;
      color : white
}
</style>

