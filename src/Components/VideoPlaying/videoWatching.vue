<template>

<div >
  <v-layout row wrap>
    <v-flex xs12 style="paddingBottom: 4em">
      <!-- video player -->
        <app-player  ></app-player>
        <!-- video player end-->
    </v-flex>
    <v-flex xs8 style="paddingLeft: 3em; paddingTop: 1em">
      <!-- video details -->
          <app-details :video="video"></app-details>
      <!-- video details end-->

      <!-- comments -->
      <app-comments :comments="video.comments"></app-comments>
      <!-- comments end -->
    </v-flex>
    <v-flex xs4>
      <!-- watch  next -->
          <app-next ></app-next>
      <!-- watch next end -->
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import player from './player.vue'
import details from './vidPDetails.vue'
import comments from './videoComments.vue'
import next from './watchNext.vue'
export default {

  computed: {
    video(){
      return this.$store.state.video.playing
    }
  },
  beforeCreate() {
    this.$store.dispatch('video/loadVideo', parseInt(this.$route.params.id, 10));
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

