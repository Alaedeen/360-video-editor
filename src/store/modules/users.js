import users from '../../data/users'

const state={
  users: [],//add patern
  current: null,
  visited: null,
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
        return (user.email == log.email) || (user.name.toUpperCase() == log.name.toUpperCase())
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
    'UPDATE_USER'(state,user){
      state.current=user
      state.users.splice(state.current.id, 1, state.current)
    },
    'DELETE_USER'(state,id){
      state.users.splice(id, 1, {
        id: id,
        name: '',
        email: '',
        password: '',
        roles: [],
        dateOfBirth: {},
        countryOfResidence: '',
        description: '',
        profilePic: '',
        joined: {},
        subscribers: 0,
        subscriptions: [],
        videosLikes: [],
        videosDislikes: [],
        commentsLikes: [],
        commentsDislikes: [],
        repliesLikes: [],
        repliesDislikes: [],
      })

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
    //video like dislike
    'ADD_VIDEO_LIKE'(state, id) {
        state.current.videosLikes.push(id)
        state.users.splice(state.current.id,1,state.current)
    },
    'REMOVE_VIDEO_LIKE'(state, id) {
      state.current.videosLikes.splice(state.current.videosLikes.indexOf(id), 1)
      state.users.splice(state.current.id, 1, state.current)
    },
    'ADD_VIDEO_DISLIKE'(state, id) {
      state.current.videosDislikes.push(id)
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_VIDEO_DISLIKE'(state, id) {
      state.current.videosDislikes.splice(state.current.videosDislikes.indexOf(id), 1)
      state.users.splice(state.current.id, 1, state.current)
    },

    //comment like dislike
    'ADD_COMMENT_LIKE'(state, id) {
      state.current.commentsLikes.push(id)
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_COMMENT_LIKE'(state, id) {
      var index = state.current.commentsLikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId)
      });
      state.current.commentsLikes.splice(index, 1)
      state.users.splice(state.current.id, 1, state.current)
    },
    'ADD_COMMENT_DISLIKE'(state, id) {
      state.current.commentsDislikes.push(id)
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_COMMENT_DISLIKE'(state, id) {
      var index = state.current.commentsDislikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId)
      });
      state.current.commentsDislikes.splice(index, 1)
      state.users.splice(state.current.id, 1, state.current)
    },

    //reply like dislike
    'ADD_REPLY_LIKE'(state, id) {
      state.current.repliesLikes.push(id)
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_REPLY_LIKE'(state, id) {
      var index = state.current.repliesLikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId) && (element.replyId == id.replyId)
      });
      state.current.repliesLikes.splice(index, 1)
      state.users.splice(state.current.id, 1, state.current)
    },
    'ADD_REPLY_DISLIKE'(state, id) {
      state.current.repliesDislikes.push(id)
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_REPLY_DISLIKE'(state, id) {
      var index = state.current.repliesDislikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId) && (element.replyId == id.replyId)
      });
      state.current.repliesDislikes.splice(index, 1)
      state.users.splice(state.current.id, 1, state.current)
    },
    //visit other user account
    'VISIT_ACCOUNT'(state,id){
      state.visited = state.users.filter(user => {
        return (user.id == id)
      })[0]
    },
    //add remove subscription
    'ADD_SUBSCRIPTION'(state){
        state.visited.subscribers++
        state.users.splice(state.visited.id, 1, state.visited)
        state.current.subscriptions.push(state.visited.id)
        state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_SUBSCRIPTION'(state) {
        state.visited.subscribers--
        state.users.splice(state.visited.id, 1, state.visited)
        state.current.subscriptions.splice(state.current.subscriptions.indexOf(state.visited.id), 1)
        state.users.splice(state.current.id, 1, state.current)
      },
    //add remove admin
    'ADD_ADMIN'(state,id) {
      var user = state.users.filter(user => {
        return (user.id == id)
      })[0]
      user.roles.push('admin')
      state.users.splice(user.id,1,user)
    },
    'REMOVE_ADMIN'(state, id) {
      var user = state.users.filter(user => {
        return (user.id == id)
      })[0]
      user.roles.splice(1,1)
      state.users.splice(user.id, 1, user)
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
  },
  //video likes dislikes
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
  //comment likes dislikes
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
  //reply likes dislikes
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
  updateUser: ({commit}, user)=>{
    commit('UPDATE_USER',user)
  },
  visitAccount: ({commit}, id)=>{
    commit('VISIT_ACCOUNT',id)
  },
  //add remove subscriptions
  addSbuscription: ({commit})=>{
    commit('ADD_SUBSCRIPTION')
  },
  removeSbuscription: ({commit})=>{
    commit('REMOVE_SUBSCRIPTION')
  },
  //delete user
  deleteUser: ({commit},id)=>{
    commit('DELETE_USER',id)
  },
  //add remove admin
  addAdmin: ({commit},id)=>{
    commit('ADD_ADMIN',id)
  },
  removeAdmin: ({commit},id)=>{
    commit('REMOVE_ADMIN',id)
  }
}

export const user = {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
