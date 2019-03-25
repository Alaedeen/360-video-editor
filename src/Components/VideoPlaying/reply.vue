<template>
<div>
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
    <div style="paddingLeft: 5em;">
        <!-- like dislike  actions -->
          <app-actions :items="replyItems"></app-actions>
        <!-- like dislike  actions -->
    </div>
</div>
</template>

<script>
import actions from './userActions.vue'
export default {
props : {
    reply: {
      type : Object,
      default: {}
    },
    idComment: {
      type : Number,
    }
  },
  computed: {
    replyItems(){
      return [
          {
            icon: 'thumb_up',
            label: this.reply.likes,
            func: this.likeReply,
            color: this.likeCol
          },
          {
            icon: 'thumb_down',
            label: this.reply.dislikes,
            func: this.dislikeReply,
            color: this.dislikeCol
          },
        ]
    },
    //like reply
    liked(){
      if (this.$store.state.user.current==null) {
        return false
      }else {
        var ids ={
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.idComment,
            replyId: this.reply.idReply
          }
        return this.$store.state.user.current.repliesLikes.find(function(element) {
          return (element.videoId == ids.videoId) && (element.commentId == ids.commentId) && (element.replyId == ids.replyId)
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
    //dislike reply
    disliked(){
      if (this.$store.state.user.current==null) {
        return false
      }else {
         var ids ={
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.idComment,
            replyId: this.reply.idReply
          }
        return this.$store.state.user.current.repliesDislikes.find(function(element) {
          return (element.videoId == ids.videoId) && (element.commentId == ids.commentId) && (element.replyId == ids.replyId)
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
    likeReply(){
      if (this.$store.state.user.current==null) {
          this.$router.push({path:'/login'})
        }
        else{
          var ids ={
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.idComment,
            replyId: this.reply.idReply
          }

          if (!this.liked) {
            if (this.disliked) {
              this.$store.dispatch('user/removeReplyDislike',ids)
              this.$store.dispatch('video/removeReplyDislike',ids)
            }
            this.$store.dispatch('user/addReplyLike',ids)
            this.$store.dispatch('video/addReplyLike',ids)
          }else{
            this.$store.dispatch('user/removeReplyLike',ids)
            this.$store.dispatch('video/removeReplyLike',ids)
          }
        }

    },
    dislikeReply(){
      if (this.$store.state.user.current==null) {
          this.$router.push({path:'/login'})
      }
      else{
          var ids ={
            videoId: this.$store.state.video.playing.vidId,
            commentId: this.idComment,
            replyId: this.reply.idReply
          }

          if (!this.disliked) {
            if (this.liked) {
              this.$store.dispatch('user/removeReplyLike',ids)
              this.$store.dispatch('video/removeReplyLike',ids)
            }
            this.$store.dispatch('user/addReplyDislike',ids)
            this.$store.dispatch('video/addReplyDislike',ids)
          }else{
            this.$store.dispatch('user/removeReplyDislike',ids)
            this.$store.dispatch('video/removeReplyDislike',ids)
          }
        }
    }
  },
  components: {
    appActions: actions
  }
}
</script>

<style scoped>

</style>

