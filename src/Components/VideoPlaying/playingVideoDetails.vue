<template>
<div>
  <v-layout row wrap>
              <v-flex xs12 >
                  <p class="title" style="color: white; "><b> {{video.title}} </b></p>
              </v-flex>
              <v-flex xs5 md8>
                  <p style="color: grey;"><span>{{video.views}}</span><span> views</span></p>
              </v-flex>
              <v-flex xs6 md4>
                <!-- like dislike share actions -->
                  <app-actions :items="items"></app-actions>
                <!-- like dislike share actions -->
              </v-flex>
          </v-layout>
          <v-divider color="grey"></v-divider>
          <v-layout row wrap>
              <v-flex
                  xs7
                  md10
                  layout
                >

              <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-avatar
                              size= '50'
                              color="grey lighten-4"
                              v-on="on"
                            >
                              <v-img :src="'http://localhost:8000/assets/profilePictures/'+visited.profilePic" alt="avatar"
                              style="cursor: pointer"
                              @click="visitAccount"></v-img>
                        </v-avatar>
                  </template>
                  <span> {{visited.subscribers}} SUBSCRIBERS</span>
                </v-tooltip>
                <span style="text-align : left">
                  <br>
                  <h6 class = 'name'
                  style="cursor: pointer"
                  @click="visitAccount">
                   {{visited.name}}
                   </h6>
                  <p style="padding-left: 1em; color: grey;"><span>Published on </span><span>{{video.uploadDate.month}} {{video.uploadDate.day}}, {{video.uploadDate.year}}</span></p>
                </span>
                </v-flex>
                <v-btn :color="subscribeBtn.color" style="color: white;" @click="subscribe"> {{subscribeBtn.label}} </v-btn>
          </v-layout>
          <v-layout row wrap>
              <v-flex xs12>
                <p class="text-sm-left" style="color: white"><b>DESCRIPTION</b></p>
                <p style="color: white"> this is the description of this video</p>
                <v-divider color="grey"></v-divider><br>
              </v-flex>
          </v-layout>
</div>
</template>
<script>
import actions from './userActions.vue'
import { mapActions } from 'vuex';
export default {
  data() {
    return {
    }
  },
components:{
  appActions: actions
},
props: ['video'],
computed: {
  visited(){
    return this.$store.state.user.visited
  },
  items(){
    return [
        {
          icon: 'thumb_up',
          label: this.video.likes,
          func: this.likeVideo,
          color: this.likeCol
        },
        {
          icon: 'thumb_down',
          label: this.video.dislikes,
          func: this.dislikeVideo,
          color: this.dislikeCol
        },
        {
          icon: 'share',
          label: 'SHARE',
          func : ()=> { },
          color: 'grey'
        },
      ]
  },
  //subscribe
  subscribed(){
    if (this.$store.state.user.current==null) {
      return false
    }else {
      return this.$store.state.user.current.subscriptions.includes(this.visited.id)
    }
  },
  subscribeBtn(){
    if (!this.subscribed) {
      return {
        color :'red',
        label : 'SUBSCRIBE'
      }
    }else{
      return {
        color :'grey',
        label : 'SUBSCRIBED'
      }
    }
  },
  //like video
  liked(){
    if (this.$store.state.user.current==null) {
      return false
    }else {
      return this.$store.state.user.current.videosLikes.includes(this.video.vidId)
    }
  },
  likeCol(){
    if (this.liked) {
      return 'blue'
    }else{
      return 'grey'
    }
  },
  //dislike video
  disliked(){
    if (this.$store.state.user.current==null) {
      return false
    }else {
      return this.$store.state.user.current.videosDislikes.includes(this.video.vidId)
    }
  },
  dislikeCol(){
    if (this.disliked) {
      return 'red'
    }else{
      return 'grey'
    }
  },
},
methods: {
  ...mapActions({
    getAccount : 'user/visitAccount'
  }),
  visitAccount(){
  this.$router.push({path: '/visit/' + this.video.userId})
  },
  likeVideo(){

      if (this.$store.state.user.current==null) {
          this.$router.push({path:'/login'})
      }
      else{
        if (!this.liked) {
          if (this.disliked) {
            this.$store.dispatch('user/removeVideoDislike',this.video.vidId)
            this.$store.dispatch('video/removeVideoDislike',this.video.vidId)
          }
          this.$store.dispatch('user/addVideoLike',this.video.vidId).then(()=>{
            this.$store.dispatch('video/addVideoLike',this.video.vidId)
          })
        }else{
          this.$store.dispatch('user/removeVideoLike',this.video.vidId).then(()=>{
            this.$store.dispatch('video/removeVideoLike',this.video.vidId)
          })
        }
      }
  },
  dislikeVideo(){
      if (this.$store.state.user.current==null) {
          this.$router.push({path:'/login'})
      }
      else{
        if (!this.disliked) {
          if (this.liked) {
            this.$store.dispatch('user/removeVideoLike',this.video.vidId)
            this.$store.dispatch('video/removeVideoLike',this.video.vidId)
          }
          this.$store.dispatch('user/addVideoDislike',this.video.vidId)
          this.$store.dispatch('video/addVideoDislike',this.video.vidId)
        }else{
          this.$store.dispatch('user/removeVideoDislike',this.video.vidId)
          this.$store.dispatch('video/removeVideoDislike',this.video.vidId)
        }
      }
  },
  //Subscribe
  subscribe(){
    if (this.$store.state.user.current==null) {
            this.$router.push({path:'/login'})
        }else{
          if (!this.subscribed) {
            this.$store.dispatch('user/addSbuscription')
          }else{
            this.$store.dispatch('user/removeSbuscription')
          }
        }
  }
},

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

