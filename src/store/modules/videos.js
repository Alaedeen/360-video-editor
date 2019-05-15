import videos from '../../data/videos'
import {videoService} from '../../services/videoService'
const state = {
  videos: [],
  search: '',
  filtredVideos: [],
  myVideos: [],
  playing: {},
  videosCount: 0,
  videoLoading: false
}

const getters = {
  videos: state => {
    return state.videos
  }
}

const mutations = {
  SET_LOADING(state, loading) {
    state.videoLoading = loading
  },
  'SET_VIDEOS'(state, {data,count}) {
        state.videos = data
        state.videosCount = count
  },
  'SET_SEARCH'(state, val){
    state.search=val
  },
  'FILTER_VIDEOS'(state, {data,count}) {
        state.filtredVideos = data
        state.videosCount = count
  },
  'USER_VIDEOS'(state,{data,count}) {
    state.myVideos = data
    state.videosCount = count
  },
  'INIT_ALL'(state) {
    state.filtredVideos = state.videos;
    state.myVideos = state.videos;
  },
  'LOAD_VIDEO'(state, video) {
    state.playing = video
  },

  //add comment
  'ADD_COMMENT'(state,comment) {
    var vid = state.videos.filter(video => {
      return video.vidId == comment.id
    })[0]
    //today date
    var today = new Date();
      var day = today.getDate();
      var month = today.getMonth()+1; //January is 0!
      var year = today.getFullYear();
      switch (month) {
        case 1: month='January'
          break;
        case 2: month='February'
          break;
        case 3: month='March'
          break;
        case 4: month='April'
          break;
        case 5: month='May'
          break;
        case 6: month='June'
          break;
        case 7: month='Jully'
          break;
        case 8: month='August'
          break;
        case 9: month='September'
          break;
        case 10: month='October'
          break;
        case 11: month='November'
          break;
        case 12: month='December'
          break;
      }
    //today date end
    var com = {
      idComment : vid.comments.length,
      idUser: comment.user.id,
      nameUser: comment.user.name,
      profilePic: comment.user.profilePic,
      text: comment.text,
      date: {
        day: day,
        month: month,
        year: year
      },
      likes: 0,
      dislikes: 0,
      replies: []
    }

    vid.comments.splice(0,0,com)
    videos.splice(vid.vidId, 1, vid)
  },

  //add/remove like to a comment
  'ADD_COMMENT_LIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment =>{
      return comment.idComment == id.commentId
    })[0]
    com.likes++
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },
  'REMOVE_COMMENT_LIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    com.likes--
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },

  //add/remove dislike to a comment
  'ADD_COMMENT_DISLIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    com.dislikes++
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },
  'REMOVE_COMMENT_DISLIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    com.dislikes--
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },

  //add reply
  'ADD_REPLY'(state, reply) {
    var vid = state.videos.filter(video => {
      return video.vidId == reply.id
    })[0]
    var comment = vid.comments.filter(comment =>{
      return comment.idComment == reply.idComment
    })[0]
    //today date
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; //January is 0!
    var year = today.getFullYear();
    switch (month) {
      case 1:
        month = 'January'
        break;
      case 2:
        month = 'February'
        break;
      case 3:
        month = 'March'
        break;
      case 4:
        month = 'April'
        break;
      case 5:
        month = 'May'
        break;
      case 6:
        month = 'June'
        break;
      case 7:
        month = 'Jully'
        break;
      case 8:
        month = 'August'
        break;
      case 9:
        month = 'September'
        break;
      case 10:
        month = 'October'
        break;
      case 11:
        month = 'November'
        break;
      case 12:
        month = 'December'
        break;
    }
    //today date end
    var replyDetails = {
      idReply: comment.replies.length,
      idUser: reply.user.id,
      nameUser: reply.user.name,
      profilePic: reply.user.profilePic,
      text: reply.text,
      date: {
        day: day,
        month: month,
        year: year
      },
      likes: 0,
      dislikes: 0,
    }
    comment.replies.splice(0, 0, replyDetails)
    vid.comments.splice((vid.comments.length - 1) - comment.idComment,1,comment)
    videos.splice(vid.vidId, 1, vid)
  },

  //add/remove like to a reply
  'ADD_REPLY_LIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    var reply = com.replies.filter(rep => {
      return rep.idReply == id.replyId
    })[0]
    reply.likes++
    com.replies.splice((com.replies.length - 1) - reply.idReply, 1, reply)
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },
  'REMOVE_REPLY_LIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    var reply = com.replies.filter(rep => {
      return rep.idReply == id.replyId
    })[0]
    reply.likes--
    com.replies.splice((com.replies.length - 1) - reply.idReply, 1, reply)
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },

  //add/remove dislike to a reply
  'ADD_REPLY_DISLIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    var reply = com.replies.filter(rep => {
      return rep.idReply == id.replyId
    })[0]
    reply.dislikes++
    com.replies.splice((com.replies.length - 1) - reply.idReply, 1, reply)
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },
  'REMOVE_REPLY_DISLIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id.videoId
    })[0]
    var com = vid.comments.filter(comment => {
      return comment.idComment == id.commentId
    })[0]
    var reply = com.replies.filter(rep => {
      return rep.idReply == id.replyId
    })[0]
    reply.dislikes--
    com.replies.splice((com.replies.length - 1) - reply.idReply, 1, reply)
    vid.comments.splice((vid.comments.length - 1) - com.idComment, 1, com)
    videos.splice(vid.vidId, 1, vid)
  },
}

const actions = {
  setVideos: ({commit}, request) => {
    commit('SET_LOADING', true)
    videoService.fetchVideos(request).then((data) => {

      commit('SET_LOADING', false)
      commit('SET_VIDEOS', {
        count: data.data.count,
        data: data.data.response.data
      })
    })
  },
  initAll: ({commit}) => {
    commit('INIT_ALL')
  },
  setSearch: ({commit}, val) =>{
    commit('SET_SEARCH', val)
  },
  filterVideos: ({commit},request)=>{
    commit('SET_LOADING', true)
    videoService.filterVideos(request).then((data) => {
      commit('SET_LOADING', false)
      commit('FILTER_VIDEOS', {
        count: data.data.count,
        data: data.data.response.data
      })
    })
  },
  userVideos: ({commit},request)=>{
    commit('SET_LOADING', true)
    videoService.userVideos(request).then((data) => {
      commit('SET_LOADING', false)
      commit('USER_VIDEOS', {
        count: data.data.count,
        data: data.data.response.data
      })
    })
  },
  loadVideo: ({commit},vidId)=>{
    return new Promise((resolve, reject) => {
        videoService.loadVideo(vidId).then((data) => {
          commit('LOAD_VIDEO', data.data.data)
          resolve()
        })
    })

  },
  //video like dislike
  addVideoLike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var video = {
        likes: ++state.playing.likes
      }
      var request= {
        video : video,
        id : id
      }
      videoService.updateVideo(request).then((data) => {
        resolve()
      })
    })
  },
  removeVideoLike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var video = {
        likes: --state.playing.likes
      }
      var request = {
        video: video,
        id: id
      }
      videoService.updateVideo(request).then((data) => {
        resolve()
      })
    })
  },
  addVideoDislike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var video = {
        dislikes: ++state.playing.dislikes
      }
      var request = {
        video: video,
        id: id
      }
      videoService.updateVideo(request).then((data) => {
        resolve()
      })
    })
  },
  removeVideoDislike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var video = {
        dislikes: --state.playing.dislikes
      }
      var request = {
        video: video,
        id: id
      }
      videoService.updateVideo(request).then((data) => {
        resolve()
      })
    })
  },
  //add comment
  addComment: ({commit},comment)=>{
    commit('ADD_COMMENT', comment)
  },
  //comment like dislike
  addCommentLike: ({commit}, id)=>{
    commit('ADD_COMMENT_LIKE',id)
  },
  removeCommentLike: ({commit}, id)=>{
    commit('REMOVE_COMMENT_LIKE', id)
  },
  addCommentDislike: ({commit}, id)=>{
    commit('ADD_COMMENT_DISLIKE',id)
  },
  removeCommentDislike: ({commit}, id)=>{
    commit('REMOVE_COMMENT_DISLIKE', id)
  },
  //add reply
  addReply: ({commit},reply)=>{
    commit('ADD_REPLY', reply)
  },
  //reply like dislike
  addReplyLike: ({commit}, id)=>{
    commit('ADD_REPLY_LIKE',id)
  },
  removeReplyLike: ({commit}, id)=>{
    commit('REMOVE_REPLY_LIKE', id)
  },
  addReplyDislike: ({commit}, id)=>{
    commit('ADD_REPLY_DISLIKE',id)
  },
  removeReplyDislike: ({commit}, id)=>{
    commit('REMOVE_REPLY_DISLIKE', id)
  },
}

export const video = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
