import videos from '../../data/videos'

const state = {
  videos: [],
  filtredVideos: [],
  myVideos: [],
  playing: {}
}

const getters = {
  videos: state => {
    return state.videos
  }
}

const mutations = {
  'SET_VIDEOS'(state, videos) {
    state.videos = videos;
  },
  'FILTER_VIDEOS'(state, title) {
    state.filtredVideos = state.videos.filter(video => {
      return video.title.toUpperCase().includes(title.toUpperCase())
    });
  },
  'USER_VIDEOS'(state,id) {
    state.myVideos = state.videos.filter(video => {
      return video.userId==id
    });
  },
  'INIT_ALL'(state) {
    state.filtredVideos = state.videos;
    state.myVideos = state.videos;
  },
  'LOAD_VIDEO'(state,vidId) {
    state.playing = state.videos.filter(video => {
      return video.vidId == vidId
    })[0]
  },
  //add/remove like to a video
  'ADD_VIDEO_LIKE'(state,id){
    var vid = state.videos.filter(video =>{
      return video.vidId==id
    })[0]
    vid.likes++;
    videos.splice(vid.vidId,1,vid)
  },
  'REMOVE_VIDEO_LIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id
    })[0]
    vid.likes--;
    videos.splice(vid.vidId, 1, vid)
  },

  //add/remove dislike to a video
  'ADD_VIDEO_DISLIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id
    })[0]
    vid.dislikes++;
    videos.splice(vid.vidId, 1, vid)
  },
  'REMOVE_VIDEO_DISLIKE'(state, id) {
    var vid = state.videos.filter(video => {
      return video.vidId == id
    })[0]
    vid.dislikes--;
    videos.splice(vid.vidId, 1, vid)
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
}

const actions = {
  initVideos: ({commit}) => {
    commit('SET_VIDEOS', videos)
  },
  initAll: ({commit}) => {
    commit('INIT_ALL')
  },
  filterVideos: ({commit},title)=>{
    commit('FILTER_VIDEOS', title)
  },
  userVideos: ({commit},id)=>{
    commit('USER_VIDEOS', id)
  },
  loadVideo: ({commit},vidId)=>{
    commit('LOAD_VIDEO',vidId)
  },
  addVideoLike: ({commit}, id)=>{
    commit('ADD_VIDEO_LIKE',id)
  },
  removeVideoLike: ({commit}, id)=>{
    commit('REMOVE_VIDEO_LIKE', id)
  },
  addVideoDislike: ({commit}, id)=>{
    commit('ADD_VIDEO_DISLIKE',id)
  },
  removeVideoDislike: ({commit}, id)=>{
    commit('REMOVE_VIDEO_DISLIKE', id)
  },
  addComment: ({commit},comment)=>{
    commit('ADD_COMMENT', comment)
  },
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
}

export const video = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
