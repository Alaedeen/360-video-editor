<template>
<div style="marginBottom: 1em; cursor: pointer" @click="GoNext" v-if="video.vidId!=playingId">
  <v-card color="#444444" class="white--text" style="marginLeft: 1.5em; paddingLeft: 0.5em; marginRight: 1em;paddingRight: 1.5em;" >
                <v-layout row>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline"> {{video.title}} </div>
                        <div>{{video.userName}} </div>
                        <p class="date">{{video.uploadDate.month}} {{video.uploadDate.day}}, {{video.uploadDate.year}}</p>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-img
                      :src="video.thumbnail"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-card>
</div>
</template>

<script>
export default {
  props :{
    video :{
      type : Object,
    },
    playingId: {
      type: Number
    }
  },
  methods: {
    GoNext(){
      this.$router.push({path: '/watch/'+this.video.vidId})
      window.location.reload()
    }
  },

}
</script>

<style scoped>
  .date{
    color: grey;
    font-size: 0.85em;
  }
</style>

