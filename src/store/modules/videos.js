import videos from '../../data/videos'

const state = {
  videos: [],
  filtredVideos: []
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
    console.log(title)
    state.filtredVideos = state.videos.filter(video => {
      return video.title.toUpperCase().includes(title.toUpperCase())
    });
  },
  'INIT_FILTRED'(state) {
    state.filtredVideos = state.videos;
  },
}

const actions = {
  initVideos: ({commit}) => {
    commit('SET_VIDEOS', videos)
  },
  initFiltred: ({commit}) => {
    commit('INIT_FILTRED')
  },
  filterVideos: ({commit},title)=>{
    commit('FILTER_VIDEOS', title)
  }
}

export const video = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
