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
              clearable
              @focus="account"></v-text-field>
              <v-btn color="grey" style="color: white;" @click="addComment">ADD COMMENT</v-btn>

          </v-layout>
          <!-- video comments -->
            <v-layout row wrap style="width: 100%">
            <div class="profile" style="width: 100%">
                <div v-for="(comment,index) in comments" :key="index">
                  <v-divider color="grey" v-if="index>0" ></v-divider>
                    <app-comment :comment="comment"  :reply="replies[index]"></app-comment>

                  </div>
            </div>

          </v-layout>
          <!-- video Comments end -->

  </div>
</template>
<script>
import comment from './comment.vue'
export default {
  data() {
    return {
      comment:'',
      replies: []
    }
  },
  props: ['comments','videoId'],
  components: {
    appComment: comment
  },
  computed: {
    user(){
      if (this.$store.state.user.current==null) {
        return null
      }else{
        return this.$store.state.user.current
      }
    },
    
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
        this.replies.splice(0,0,false)
      }
    },
    account(){
      if (this.$store.state.user.current==null) {
        this.$router.push({path: '/login'})
      }
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


