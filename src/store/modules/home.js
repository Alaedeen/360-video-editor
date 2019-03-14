
const state = {
  header: false,
  side: true
}

const getters = {
  home: state => {
    return state.home
  }
}

const mutations = {
  'TOGGLE_SIDE'(state) {
    state.side = !state.side;
  },
  'SET_HEADER'(state, head) {
    state.header= head
  }
}

const actions = {
  toggleSide: ({commit}) => {
    commit('TOGGLE_SIDE')
  },
  setHead: ({commit},order) => {
    commit('SET_HEADER', order)
  }
}

export const home = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
