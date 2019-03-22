<template>
  <div>
    <v-layout row wrap>
            <h5 style="color: white"><span> {{comments.length}} </span><span>Comments</span></h5>

          </v-layout>
          <v-layout row wrap style="width: 100%">
              <v-text-field
              label="Comment"
              color="blue"
              v-model="comment"
              @submit.prevent="addComment"></v-text-field>
              <v-btn color="grey" style="color: white;" @click="addComment">ADD COMMENT</v-btn>

          </v-layout>
          <v-layout row wrap style="width: 100%">
            <div class="profile" style="width: 100%">
                <div v-for="(comment,index) in comments" :key="index">
                  <v-divider color="grey" v-if="index>0" ></v-divider>
                <div>
                  <v-avatar style="display: inline-block;" size= '40'>
                    <img :src="'/'+comment.profilePic">
                  </v-avatar>
                  <p style="color: grey; display: inline-block; marginLeft: 1em">
                      <b> {{comment.nameUser}} </b>
                    </p>
                    <p style="color: white;marginLeft: 5em">
                      {{comment.text}}
                      </p>

                </div>
                <p style="paddingLeft: 5em;">
                    <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;" small>thumb_up</v-icon> {{comment.likes}} </span>
                    <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 0.5em;" small>thumb_down</v-icon> {{comment.dislikes}} </span>
                    <span style="color: grey;cursor : pointer;" @click="reply(index)"><v-icon color="grey" style=" padding-left : 0.5em;" small>reply</v-icon>  REPLY</span>
                  </p>
                  <div style="width: 100%" v-if="replies[index]">
                    <v-text-field label="Reply"   style="padding-left : 5em;display:inline-block;width: 80%"></v-text-field>
                    <v-btn color="grey" style="color: white; display:inline-block;" >ADD REPLY</v-btn>
                  </div>
                  <v-expansion-panel inset v-if="comment.replies.length!=0">
            <v-expansion-panel-content style="backgroundColor: #444444; color: white;" >
                  <template v-slot:actions>
                    <v-icon color="red">$vuetify.icons.expand</v-icon>
                  </template>
                      <template v-slot:header>
                        <div>View replies</div>
                      </template>
                      <div  class="profile" style="paddingLeft: 3em;">
                              <div v-for="(reply,index) in comment.replies" :key="index" >
                                <v-divider color="grey" v-if="index>1"></v-divider>
                              <div >
                                <v-avatar style="display: inline-block;" size= '40'>
                                  <img :src="'/'+reply.profilePic">
                                </v-avatar>

                                  <p style="color: grey; display: inline-block; marginLeft: 1em">
                                    <b> {{reply.nameUser}} </b>
                                  </p>
                                  <p style="color: white;marginLeft: 5em">
                                    {{reply.text}}
                                  </p>


                              </div>
                              <p style="paddingLeft: 5em;">
                                  <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;" small>thumb_up</v-icon> {{reply.likes}} </span>
                                  <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 1em;" small>thumb_down</v-icon> {{reply.dislikes}} </span>
                                </p>

                              </div>
                          </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                      </div>
            </div>

          </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment:'',
      replies: []
    }
  },
  props: ['comments','videoId'],
  computed: {
    user(){
      if (this.$store.state.user.current==null) {
        return null
      }else{
        return this.$store.state.user.current
      }
    }
  },
  methods: {
    addComment(){
      if (this.$store.state.user.current==null) {
        this.$router.push({path: '/login'})
      }else{
        var comm = {
          id : this.videoId,
          text: this.comment,
          user: this.user
        }
        this.$store.dispatch('video/addComment',comm)
        this.comment=''
      }
    },
    reply(index){
      this.replies.splice(index,1,!this.replies[index])

    }
  },
  created() {
    this.comments.forEach(element => {
            this.replies.push(false)
        });
  },
}

</script>
<style scoped>

</style>


