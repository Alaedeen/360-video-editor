import videos from '../../data/videos'

const state = {
  videos: [],
  filtredVideos: [],
  myVideos: []
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
}

export const video = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
