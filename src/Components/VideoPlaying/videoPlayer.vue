<template>

<div >

<div class="valiantPhoto" data-video-src="/src/playerAssets/London Park.mp4" style="width: 480px; height: 380px; cursor:pointer"></div>
<v-layout row wrap>
  <v-flex xs12>
          <v-img
            :src="'/'+video.thumbnail"
            height="30em"
            :aspect-ratio="16/9"
          >
          </v-img>
  </v-flex>
  <v-flex xs8 style="paddingLeft: 3em">
        <v-layout row wrap>
              <v-flex xs12 >
                  <p class="title" style="color: white; paddingTop: 1em;"><b> {{video.title}} </b></p>
              </v-flex>
              <v-flex xs6>
                  <p style="color: grey;"><span>1,803,121,090</span><span> views</span></p>
              </v-flex>
              <v-flex xs6>
                  <p>
                    <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;">thumb_up</v-icon> 55</span>
                    <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 1em;">thumb_down</v-icon>  55</span>
                    <span style="color: grey;cursor : pointer;"><v-icon color="grey" style=" padding-left : 1em;">share</v-icon>  SHARE</span>
                  </p>
              </v-flex>
          </v-layout>
          <v-divider color="grey"></v-divider>
          <v-layout row wrap>
              <v-flex
                  xs8
                  align-center
                  justify-left
                  layout
                  text-xs-center
                >

              <v-avatar
                    size= '50'
                    color="grey lighten-4"
                        style="cursor: pointer"
                  >

                    <v-img :src="'/'+videoOwner.profilePic" alt="avatar">

                </v-img>
                  </v-avatar>
                <span style="text-align : left">
                  <br>
                  <h6 class = 'name'> {{videoOwner.name}} </h6>
                  <p style="padding-left: 1em; color: grey;"><span>Published on </span><span>{{video.uploadDate.month}} {{video.uploadDate.day}}, {{video.uploadDate.year}}</span></p>
                </span>
                </v-flex>
                <!-- subscribe -->
                <v-flex xs4 style="paddingTop: 1em">
                  <v-btn color="red" style="color: white;">SUBSCRIBE</v-btn>
                </v-flex>
          </v-layout>
          <v-layout row wrap>
              <v-flex xs12>
                <p class="text-sm-left" style="color: white"><b>DESCRIPTION</b></p>
                <p style="color: white"> this is the description of this video</p>
                <v-divider color="grey"></v-divider><br>
              </v-flex>
          </v-layout>
          <v-layout row wrap>
            <h5 style="color: white"><span>3,414 </span><span>Comments</span></h5>

          </v-layout>
          <v-layout row wrap>
              <v-text-field
              label="Comment"
              color="blue"
              v-model="comment"
              @submit.prevent="addComment"></v-text-field>
              <v-btn color="grey" style="color: white;" @click="addComment">ADD COMMENT</v-btn>

          </v-layout>
  </v-flex>
  <v-flex xs4>
    <v-card dark color="red">
            <v-card-text class="px-0">12</v-card-text>
          </v-card>
  </v-flex>
</v-layout>

</div>
</template>

<script>

export default {
  data() {
    return {
      comment:''
    }
  },
  computed: {
    video(){
      return this.$store.state.video.playing
    },
    videoOwner(){
      return this.$store.state.user.owner
    }
  },
  methods: {
    addComment(){
      alert(this.comment)
    }
  },
  beforeCreate() {
    let style = document.createElement('link');
    style.setAttribute('rel',"stylesheet");
    style.setAttribute('type',"text/css");
    style.setAttribute('href',"/src/playerAssets/css/valiant360.css");
    document.head.appendChild(style);
    // let playerScript = document.createElement('script');
    // playerScript.setAttribute('type',"text/javascript");
    // playerScript.setAttribute('src',"/src/playerAssets/js/jquery-1.7.2.min.js");
    // document.head.appendChild(playerScript);
    // let playerScript1 = document.createElement('script');
    // playerScript1.setAttribute('type',"text/javascript");
    // playerScript1.setAttribute('src',"/src/playerAssets/js/three.min.js");
    // document.head.appendChild(playerScript1);
    // let playerScript2 = document.createElement('script');
    // playerScript2.setAttribute('type',"text/javascript");
    // playerScript2.setAttribute('src',"/src/playerAssets/jquery.valiant360.js");
    // document.head.appendChild(playerScript2);
    // let playerScript3 = document.createElement('script');
    // playerScript3.setAttribute('type',"text/javascript");
    // playerScript3.setAttribute('src',"/src/playerAssets/script.js");
    // document.head.appendChild(playerScript3);

    this.$store.dispatch('video/loadVideo', parseInt(this.$route.params.id, 10));
    this.$store.dispatch('user/vidOwner',this.$store.state.video.playing.userId)
  },
}
</script>

<style scoped>
.name{
  padding-left: 1em;
  color : white
}
.profile{
      background-color: 	#444444;
      color : white
}
</style>

