<template>
<div>
  <v-layout row wrap>
              <v-flex xs12 >
                  <p class="title" style="color: white; "><b> {{video.title}} </b></p>
              </v-flex>
              <v-flex xs6>
                  <p style="color: grey;"><span>{{video.views}}</span><span> views</span></p>
              </v-flex>
              <v-flex xs6>
                  <p>
                    <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;" @click="likeVideo">thumb_up</v-icon> {{video.likes}} </span>
                    <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 0.5em;">thumb_down</v-icon> {{video.dislikes}} </span>
                    <span style="color: grey;cursor : pointer;"><v-icon color="grey" style=" padding-left : 0.5em;">share</v-icon>  SHARE</span>
                  </p>
              </v-flex>
          </v-layout>
          <v-divider color="grey"></v-divider>
          <v-layout row wrap>
              <v-flex
                  xs8
                  layout
                >

              <v-avatar
                    size= '50'
                    color="grey lighten-4"
                        style="cursor: pointer"
                  >

                    <v-img :src="'/'+video.profilePic" alt="avatar">

                </v-img>
                  </v-avatar>
                <span style="text-align : left">
                  <br>
                  <h6 class = 'name'> {{video.userName}} </h6>
                  <p style="padding-left: 1em; color: grey;"><span>Published on </span><span>{{video.uploadDate.month}} {{video.uploadDate.day}}, {{video.uploadDate.year}}</span></p>
                </span>
                </v-flex>
                <v-btn color="red" style="color: white;" >SUBSCRIBE</v-btn>
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
export default {
props: ['video'],
methods: {
  likeVideo(){
      // if (this.$store.state.user.current==null) {
      //     this.$router.push({path:'/login'})
      // }
      // else{
        this.$store.dispatch('video/addLike',this.video.vidId)
      // }
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

