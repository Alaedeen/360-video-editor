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
  }
}

export const video = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
