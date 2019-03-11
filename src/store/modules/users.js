import users from '../../data/users'

const state={
  users: [],
  current: null
}

const getters= {
  users: state =>{
    return state.users
  }
}

const mutations = {
    'SET_USERS'(state, blogs) {
      state.users = users;
    },
    'ADD_USER'(state, user) {
      state.uesrs.push(user)
    },
    'SIGN_IN'(state, log) {
      var U = state.users.filter(user => {
        return (user.email == log.email) && (user.password == log.password)
      })
      if (U.length == 0) {
        alert('user does not exist')
      } else {
        state.current = U

      }

    }
}

const actions = {
  initUsers: ({commit}) => {
    commit('SET_USERS', users)
  },
  signIn: ({commit},  order) =>{
      commit('SIGN_IN' ,order)
  }
}

export const user = {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
