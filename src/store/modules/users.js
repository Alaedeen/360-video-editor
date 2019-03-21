import users from '../../data/users'

const state={
  users: [],//add patern
  current: null,
  loginError: false,
  signinError: false
}

const getters= {
  users: state =>{
    return state.users
  }
}

const mutations = {
    'SET_USERS'(state, users) {
      state.users = users;
    },
    'ADD_USER'(state, log) {
      log.id=state.users.length
      var U = state.users.filter(user => {
        return (user.email == log.email)
      })

      if (U.length != 0) {
        state.signinError = true
        setTimeout(function () {
          state.signinError = false
        }, 2000);
      } else {
        state.current = log
        state.users.push(log)
      }
    },
    'SIGN_IN'(state, log) {
      var U = state.users.filter(user => {
        return (user.email == log.email) && (user.password == log.password)
      })
      if (U.length == 0) {
        state.loginError=true
        setTimeout(function () {
          state.loginError = false
        }, 2000);

      } else {
        state.current = U[0]
      }
    },
    'LOG_OUT'(state){
      state.current=null
    },
    'ADD_VIDEO_LIKE'(state, id) {
        state.current.videosLikes.push(id)
    },
    'REMOVE_VIDEO_LIKE'(state, id) {
      state.current.videosLikes.splice(state.current.videosLikes.indexOf(id), 1)
    },
    'ADD_VIDEO_DISLIKE'(state, id) {
      state.current.videosDislikes.push(id)
    },
    'REMOVE_VIDEO_DISLIKE'(state, id) {
      state.current.videosDislikes.splice(state.current.videosDislikes.indexOf(id), 1)
    },
}

const actions = {
  initUsers: ({commit}) => {
    commit('SET_USERS', users)
  },
  signIn: ({commit},  order) =>{
      commit('SIGN_IN' ,order)
  },
  addUser: ({commit},order)=>{
    commit('ADD_USER', order)
  },
  logOut: ({commit})=>{
    commit('LOG_OUT')
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

export const user = {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
