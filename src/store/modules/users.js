import users from '../../data/users'

const state={
  users: [
    {
      id: null,
      name: null,
      email: null,
      password: null,
      status: null
    }
  ],//add patern
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
    }
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
  }
}

export const user = {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
