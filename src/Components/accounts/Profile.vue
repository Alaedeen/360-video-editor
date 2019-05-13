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
        <h1 class="display-2 font-weight-thin mb-3"> {{current.name}} </h1>
        <h4 class="subheading"> {{current.subscribers}} subscribers</h4>
      </v-layout>
    </v-parallax>
  </v-app>

  <v-flex
          xs12
          sm6
          md8
          align-center
          justify-left
          layout
          text-xs-center
          class= "avatar"
        >
        <!-- Edit profile -->
          <app-edit :user="current" :action="'user'"></app-edit>
        <!--Edit profile -->

        <h2 class = 'name'> {{current.name}} </h2>
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
                        <div class="text-xs-center pt-2" v-if="videos!=null">
                          <v-pagination v-model="page" :length="pages" dark color="black" ></v-pagination>
                        </div>
                  </div>
                  <div v-if="tab=='About'">
                      <v-container grid-list-md text-xs-center>
                              <v-layout row wrap>

                                <v-flex  xs6>
                                  <p class="text-sm-left"><b>Details</b></p>
                                  <v-divider ></v-divider><br>
                                  <p class="text-sm-left">
                                    <span class='about'>E-mail</span>
                                    <span>{{current.email}}</span>
                                  </p>
                                  <p class="text-sm-left">
                                    <span class='about'>Description</span>
                                    <span>{{current.description}}</span>
                                  </p>
                                </v-flex>
                                <v-flex xs4>
                                  <p class="text-sm-left"><b>Stats</b></p>
                                  <v-divider ></v-divider><br>
                                  <p class="text-sm-left">
                                    <span class='about'>Joined</span>
                                    <span> {{current.joined.month}} {{current.joined.day}}, {{current.joined.year}} </span>
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
      tabs :['Online videos', 'About' ],
      page : 1
    }
  },
computed: {
    current() {
      return this.$store.state.user.current
    },
    videos(){
      return this.$store.state.video.myVideos
    },
    pages() {
    return Math.ceil(this.$store.state.video.videosCount/18)
    },
  },
  created() {
    var request = {
      id: this.current.id,
      offset: 0,
      limit: 18
    }
    this.$store.dispatch('video/userVideos',request)
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

