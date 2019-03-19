<template>

<div >


<v-layout row wrap>
  <v-flex xs12 style="paddingBottom: 4em">

<!-- **************************************** -->
    <!-- Specify our scene. -->
    <a-scene embedded style="height: 35em;">
        <!-- The original example also has this 180 degree rotation, to appear to be going forward. -->
        <a-videosphere rotation="0 180 0" src="#video"  play-on-vrdisplayactivate-or-enter-vr  arrow-key-rotation toggle-play-on-window-click>
        </a-videosphere>

        <!-- Define camera with zero user height, movement disabled and arrow key rotation added. -->
        <a-camera user-height="0" wasd-controls-enabled="false" arrow-key-rotation>

        </a-camera>

        <!-- Wait for the video to load. -->
        <a-assets>
            <!-- Single source video. -->
            <video id="video" style="display:none" autoplay loop crossorigin="anonymous" playsinline webkit-playsinline>
                <!-- MP4 video source. -->
                <source type="video/mp4" src="/src/playerAssets/London Park.mp4" />
            </video>
        </a-assets>

        <button  style="position:absolute;top:35em;left:20px;" class="btn ">
      <v-icon color="grey" style="cursor : pointer;">play_circle_filled</v-icon>
    </button>
    </a-scene>
<!-- **************************************** -->

  </v-flex>
  <v-flex xs8 style="paddingLeft: 3em; paddingTop: 1em">
        <v-layout row wrap>
              <v-flex xs12 >
                  <p class="title" style="color: white; "><b> {{video.title}} </b></p>
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
          <v-layout row wrap>
            <v-list three-line class="profile">
                <div v-for="index in 5" :key="index">
                  <v-divider color="grey" v-if="index>1" ></v-divider>
                <v-list-tile >
                  <v-list-tile-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title style="color: grey">
                      <b>user name</b>
                    </v-list-tile-title>
                    <v-list-tile-sub-title style="color: white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel justo eget nunc faucibus blandit. Curabitur ac vulputate enim. Mauris ornare tellus eget sapien consectetur congue. Aliquam erat volutpat. Integer sit amet tincidunt nibh, sit amet dapibus risus. Sed dolor sapien, finibus et purus a, varius elementum sapien. Phasellus nec ex vitae ligula accumsan facilisis. Morbi in semper nulla.
                    </v-list-tile-sub-title>

                  </v-list-tile-content>

                </v-list-tile>
                <p style="paddingLeft: 5em;">
                    <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;" small>thumb_up</v-icon> 55</span>
                    <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 1em;" small>thumb_down</v-icon>  55</span>
                    <span style="color: grey;cursor : pointer;"><v-icon color="grey" style=" padding-left : 1em;" small>reply</v-icon>  REPLY</span>
                  </p>
                  <v-expansion-panel inset>
      <v-expansion-panel-content style="backgroundColor: #444444; color: white;" >
        <template v-slot:actions>
          <v-icon color="red">$vuetify.icons.expand</v-icon>
        </template>
            <template v-slot:header>
              <div>View replies</div>
            </template>
            <v-list three-line class="profile" style="paddingLeft: 3em;">
                    <div v-for="index in 2" :key="index">
                      <v-divider color="grey" v-if="index>1"></v-divider>
                    <v-list-tile >
                      <v-list-tile-avatar >
                        <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title style="color: grey">
                          <b>user name</b>
                        </v-list-tile-title>
                        <v-list-tile-sub-title style="color: white">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel justo eget nunc faucibus blandit.
                        </v-list-tile-sub-title>

                      </v-list-tile-content>

                    </v-list-tile>
                    <p style="paddingLeft: 5em;">
                        <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;" small>thumb_up</v-icon> 55</span>
                        <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 1em;" small>thumb_down</v-icon>  55</span>
                      </p>

                    </div>
                </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>

                </div>
            </v-list>

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
    let playerScript = document.createElement('script');
    playerScript.setAttribute('type',"text/javascript");
    playerScript.setAttribute('src',"/src/playerAssets/arrow-key-rotation.js");
    document.body.appendChild(playerScript);
    let playerScript1 = document.createElement('script');
    playerScript1.setAttribute('type',"text/javascript");
    playerScript1.setAttribute('src',"/src/playerAssets/play-on-vrdisplayactivate-or-enter-vr.js");
    document.body.appendChild(playerScript1);
    let playerScript2 = document.createElement('script');
    playerScript2.setAttribute('type',"text/javascript");
    playerScript2.setAttribute('src',"/src/playerAssets/hide-once-playing.js");
    document.body.appendChild(playerScript2);
    let playerScript3 = document.createElement('script');
    playerScript3.setAttribute('type',"text/javascript");
    playerScript3.setAttribute('src',"/src/playerAssets/toggle-play-on-window-click.js");
    document.body.appendChild(playerScript3);

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

