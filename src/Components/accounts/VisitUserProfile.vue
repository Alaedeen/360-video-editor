<template>
<div class="profile" >
  <v-app id="inspire" >
    <v-parallax
      dark
     height="300" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thin mb-3"> {{user.name}} </h1>
        <h4 class="subheading"> {{user.subscribers}} subscribers</h4>
      </v-layout>
    </v-parallax>
  </v-app>

  <v-flex
          xs12
          sm6
          md10
          align-center
          justify-left
          layout
          text-xs-center
          class= "avatar"
        >
        <v-avatar
          size= '65'
          color="grey lighten-4">
          <v-img :src="'http://localhost:8000/assets/profilePictures/'+user.profilePic" alt="avatar"></v-img>
        </v-avatar>

        <h2 class = 'name'> {{user.name}} </h2>
        <v-spacer></v-spacer>
        <v-btn :color="subscribeBtn.color" style="color: white;" @click="subscribe"> {{subscribeBtn.label}} </v-btn>
        </v-flex>

        <v-app class="tabs">
          <div>
            <v-tabs
              v-model="active"
              dark
              slider-color="red"
            >
              <v-tab
                v-for="tab in tabs"
                :key="tab"
                ripple
              >
                 {{ tab }}

              </v-tab>
              <v-tab-item
                v-for="tab in tabs"
                :key="tab"
              >
                <v-card flat  class="profile">
                  <div v-if="tab=='Online videos'">
                    <v-container grid-list-md text-xs-center>
                      <v-layout row wrap>
                        <v-flex v-for="video in videos" :key="video.vidId" @click="watch(video.vidId)" xs2>
                          <app-tile style="cursor: pointer" :vid="video"></app-tile>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </div>
                  <div v-if="tab=='About'">
                      <v-container grid-list-md text-xs-center>
                              <v-layout row wrap>

                                <v-flex  xs6>
                                  <p class="text-sm-left"><b>Details</b></p>
                                  <v-divider ></v-divider><br>
                                  <p class="text-sm-left">
                                    <span class='about'>E-mail</span>
                                    <span>{{user.email}}</span>
                                  </p>
                                  <p class="text-sm-left">
                                    <span class='about'>Description</span>
                                    <span>{{user.description}}</span>
                                  </p>
                                </v-flex>
                                <v-flex xs4>
                                  <p class="text-sm-left"><b>Stats</b></p>
                                  <v-divider ></v-divider><br>
                                  <p class="text-sm-left">
                                    <span class='about'>Joined</span>
                                    <span> {{user.joined.month}} {{user.joined.day}}, {{user.joined.year}} </span>
                                  </p>
                                  <v-divider ></v-divider><br>
                                  <p class="text-sm-left">
                                    <span>85</span>
                                    <span>Views</span>
                                  </p>
                                  <v-divider ></v-divider><br>
                                  <p class="text-sm-left">
                                    <span>{{videos.length}}</span>
                                    <span>Videos</span>
                                  </p>
                                  <v-divider ></v-divider><br>
                                </v-flex>
                              </v-layout>
                            </v-container>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs>


          </div>
        </v-app>

</div>
</template>

<script>
import videoTile from '../VideoPlaying/videoTile.vue'
import ProfileEdit from './UpdateProfile.vue'
export default {
  data() {
    return {
      tabs :['Online videos', 'About' ]
    }
  },
computed: {
      user() {
        return this.$store.state.user.visited
      },
      videos(){
        return this.$store.state.video.myVideos
      },
      //subscribe
      subscribed(){
        if (this.$store.state.user.current==null) {
          return false
        }else {
          return this.$store.state.user.current.subscriptions.includes(this.user.id)
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
    },
    beforeCreate() {
      this.$store.dispatch('user/visitAccount',parseInt(this.$route.params.id, 10))
    },
created() {
  this.$store.dispatch('video/userVideos',this.user.id)
},
components: {
  appTile: videoTile,
  appEdit: ProfileEdit
},
methods: {
    watch(id){
      var url = '/watch/'+id
      this.$router.push({path:url})
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
#inspire {
  height : 300px
}
.avatar{
  padding-left: 2em;
  padding-top: 2em;
}
.name{
  padding-left: 1em;
  color : white
}
.tabs{
  padding-top: 2em;
  background-color: 	#444444
}
.profile{
      background-color: 	#444444;
      color : white
}
.about{
  color: grey;
  padding-right: 2em;
}
</style>

