<template>
  <div>
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
                <div style="paddingLeft: 5em;">
                   <!-- like dislike reply actions -->
                  <app-actions :items="commentItems"></app-actions>
                <!-- like dislike reply actions -->
                  </div>
                  <div style="width: 100%" v-if="replies">
                    <v-text-field
                    label="Reply"
                    color="blue"
                    style="padding-left : 5em;display:inline-block;width: 80%;"
                    v-model="replyText"
                    @focus="account"></v-text-field>
                    <v-btn color="grey" style="color: white; display:inline-block;" @click="addReply">ADD REPLY</v-btn>
                  </div>
                  <v-expansion-panel inset v-if="comment.replies.length!=0">
            <v-expansion-panel-content style="backgroundColor: #444444; color: white;" >
                  <template v-slot:actions>
                    <v-icon color="red">$vuetify.icons.expand</v-icon>
                  </template>
                      <template v-slot:header>
                        <div>View replies</div>
                      </template>
                      <!-- comment replies -->
                          <div  class="profile" style="paddingLeft: 3em;">
                                <div v-for="(commentReply,index) in comment.replies" :key="index" >
                                  <v-divider color="grey" v-if="index>0"></v-divider>
                                        <app-reply :reply="commentReply " :idComment="comment.idComment"></app-reply>
                                </div>
                        </div>
                      <!-- comment replies end -->

                    </v-expansion-panel-content>
                  </v-expansion-panel>
  </div>
</template>

<script>
import actions from './userActions.vue'
import CommentReply from './reply.vue'
export default {
  data() {
    return {
      replyText: '',
      replies: this.reply
    }
  },
  props : {
    comment: {
      type : Object,
      default: {}
    },
    reply: {
      type : Boolean,
      default: {}
    },
    videoId : {
      type: Number,
    }
  },
  computed: {
    user(){
      if (this.$store.state.user.current==null) {
        return null
      }else{
        return this.$store.state.user.current
      }
    },
    commentItems(){
      return [
          {
            icon: 'thumb_up',
            label: this.comment.likes,
            func: this.likeComment,
            color: this.likeCol
          },
          {
            icon: 'thumb_down',
            label: this.comment.dislikes,
            func: this.dislikeComment,
            color: this.dislikeCol
          },
          {
            icon: 'reply',
            label: 'REPLY',
            func : this.toggleReply,
            color: 'grey'
          },
        ]
    },
    //like comment
    liked(){
      if (this.$store.state.user.current==null) {
        return false
      }else {
        var ids ={
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.comment.idComment
          }
        return this.$store.state.user.current.commentsLikes.find(function(element) {
          return (element.videoId == ids.videoId) && (element.commentId == ids.commentId)
        })!=undefined;
      }
    },
    likeCol(){
      if (this.liked) {
        return 'blue'
      }else{
        return 'grey'
      }
    },
    //dislike comment
    disliked(){
      if (this.$store.state.user.current==null) {
        return false
      }else {
         var ids ={
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.comment.idComment
          }
        return this.$store.state.user.current.commentsDislikes.find(function(element) {
          return (element.videoId == ids.videoId) && (element.commentId == ids.commentId)
        })!=undefined;

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
    account(){
      if (this.$store.state.user.current==null) {
        this.$router.push({path: '/login'})
      }
    },
    toggleReply(){
      this.replies = !this.replies
    },
    likeComment(){
        if (this.$store.state.user.current==null) {
          this.$router.push({path:'/login'})
        }
        else{
          var ids = {
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.comment.idComment
          }

          if (!this.liked) {
            if (this.disliked) {
              this.$store.dispatch('user/removeCommentDislike',ids)
              this.$store.dispatch('video/removeCommentDislike',ids)
            }
            this.$store.dispatch('user/addCommentLike',ids)
            this.$store.dispatch('video/addCommentLike',ids)
          }else{
            this.$store.dispatch('user/removeCommentLike',ids)
            this.$store.dispatch('video/removeCommentLike',ids)
          }
        }
    },
    dislikeComment(){
      if (this.$store.state.user.current==null) {
          this.$router.push({path:'/login'})
      }
      else{
          var ids = {
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.comment.idComment
          }

          if (!this.disliked) {
            if (this.liked) {
              this.$store.dispatch('user/removeCommentLike',ids)
              this.$store.dispatch('video/removeCommentLike',ids)
            }
            this.$store.dispatch('user/addCommentDislike',ids)
            this.$store.dispatch('video/addCommentDislike',ids)
          }else{
            this.$store.dispatch('user/removeCommentDislike',ids)
            this.$store.dispatch('video/removeCommentDislike',ids)
          }
        }
    },
    addReply(){
      if (this.$store.state.user.current==null) {
        this.$router.push({path: '/login'})
      }else{
        var reply = {
          id : this.videoId,
          idComment: this.comment.idComment,
          text: this.replyText,
          user: this.user
        }
        this.$store.dispatch('video/addReply',reply)
        this.replyText=''
      }
    }
  },
  components: {
    appReply: CommentReply,
    appActions: actions
  }

}
</script>

<style scoped>

</style>

