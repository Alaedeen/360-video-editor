import {userService} from '../../services/userService'
const state={
  users: [],
  current: null,
  visited: null,
  loginError: false,
  signupError: false,
  usersCount:0,
  userLoading: false
}

const getters= {
  users: state =>{
    return state.users
  }
}

const mutations = {
    'INIT_CURRENT'(){
        state.current = $cookies.get('user')
    },
    'SET_USERS'(state, {data,count}) {
        state.users = data
        state.usersCount = count
    },
    'FILTER_USERS'(state, {data,count}) {
        state.users = data
        state.usersCount = count
    },
    'ADD_USER'(state, {user,code,token}) {

      if (code!=201) {
        state.signupError = true
        setTimeout(function () {
          state.signupError = false
        }, 2000);
      } else {

        $cookies.set('user', user, -1);
        $cookies.set('token', token, -1);
        state.current = user
      }
    },
    'UPDATE_USER'(state,code){

      if (code != 200) {
        state.signupError = true
        setTimeout(function () {
          state.signupError = false
        }, 2000);
      }

    },
    SET_LOADING(state,loading){
      state.userLoading = loading
    },
    'SIGN_IN'(state, {user,code,token}) {

      if (code != 200) {
        state.loginError = true
        setTimeout(function () {
          state.loginError = false
        }, 2000);

      } else {
         $cookies.set('user', user, -1);
         $cookies.set('token', token, -1);
         state.current = user
      }

    },
    'LOG_OUT'(state){
      $cookies.remove('user')
    },
    //video like dislike
    'ADD_VIDEO_LIKE'(state, id) {
        state.current.videosLikes.push(id)
        $cookies.remove('user')
        $cookies.set('user', state.current, -1);
    },
    'REMOVE_VIDEO_LIKE'(state, id) {
      state.current.videosLikes.splice(state.current.videosLikes.indexOf(id), 1)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'ADD_VIDEO_DISLIKE'(state, id) {
      state.current.videosDislikes.push(id)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'REMOVE_VIDEO_DISLIKE'(state, id) {
      state.current.videosDislikes.splice(state.current.videosDislikes.indexOf(id), 1)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },

    //comment like dislike
    'ADD_COMMENT_LIKE'(state, id) {
      state.current.commentsLikes.push(id)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'REMOVE_COMMENT_LIKE'(state, id) {
      var index = state.current.commentsLikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId)
      });
      state.current.commentsLikes.splice(index, 1)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'ADD_COMMENT_DISLIKE'(state, id) {
      state.current.commentsDislikes.push(id)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'REMOVE_COMMENT_DISLIKE'(state, id) {
      var index = state.current.commentsDislikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId)
      });
      state.current.commentsDislikes.splice(index, 1)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },

    //reply like dislike
    'ADD_REPLY_LIKE'(state, id) {
      state.current.repliesLikes.push(id) //update cookie
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_REPLY_LIKE'(state, id) {
      var index = state.current.repliesLikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId) && (element.replyId == id.replyId)
      });
      state.current.repliesLikes.splice(index, 1) //update cookie
      state.users.splice(state.current.id, 1, state.current)
    },
    'ADD_REPLY_DISLIKE'(state, id) {
      state.current.repliesDislikes.push(id) //update cookie
      state.users.splice(state.current.id, 1, state.current)
    },
    'REMOVE_REPLY_DISLIKE'(state, id) {
      var index = state.current.repliesDislikes.findIndex(function (element) {
        return (element.videoId == id.videoId) && (element.commentId == id.commentId) && (element.replyId == id.replyId)
      });
      state.current.repliesDislikes.splice(index, 1) //update cookie
      state.users.splice(state.current.id, 1, state.current)
    },
    //visit other user account
    'VISIT_ACCOUNT'(state, user) {
      state.visited = user
    },
    //add remove subscription
    'ADD_SUBSCRIPTION'(state){
      state.visited.subscribers++
      state.current.subscriptions.push(state.visited.id)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'REMOVE_SUBSCRIPTION'(state) {
      state.visited.subscribers--
      state.current.subscriptions.splice(state.current.subscriptions.indexOf(state.visited.id), 1)
      $cookies.remove('user')
      $cookies.set('user', state.current, -1);
    },
    'GET_USER'(state,user) {
      state.current = user
      $cookies.remove('user')
      $cookies.set('user', user, -1);
    }
}

const actions = {
  initCurrent: ({commit}) => {
    commit('INIT_CURRENT')
  },
  setUsers: ({commit}, request) => {
     commit('SET_LOADING', true)
    userService.fetchUsers(request).then((data)=>{
        commit('SET_LOADING', false)
        commit('SET_USERS', {
          count: data.data.count,
          data: data.data.response.data
        })
    })
  },
  filterUsers: ({ commit }, request) => {
    commit('SET_LOADING', true)
    userService.filterUsers(request).then((data) => {
      commit('SET_LOADING', false)
      commit('FILTER_USERS', {
        count: data.data.count,
        data: data.data.response.data
      })
    })
  },
  signIn: ({commit},  order) =>{
    userService.signIn(order).then((res) => {
      commit('SIGN_IN', {
        user: res.data.response.data,
        code: res.data.response.code,
        token: res.data.token
      })
    })
  },
  addUser: ({commit},order)=>{
    userService.addUser(order).then((res) => {
      commit('ADD_USER', {
        user: res.data.response.data,
        code: res.data.response.code,
        token: res.data.token
      })
    })
  },
  logOut: ({commit})=>{
    commit('LOG_OUT')
  },
  //video likes dislikes
  addVideoLike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var request = {
        idUser: state.current.id,
        idVideo: id
      }
      userService.addvideoLike(request).then(() => {
        commit('ADD_VIDEO_LIKE', id)
        resolve()
      })
    })
  },
  removeVideoLike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var queries = {
        idVideo: id,
        idUser: state.current.id
      }
      userService.removevideoLike(queries).then(() => {
        commit('REMOVE_VIDEO_LIKE', id)
        resolve()
      })
    })
  },
  addVideoDislike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var request = {
        idUser: state.current.id,
        idVideo: id
      }
      userService.addvideoDislike(request).then(() => {
        commit('ADD_VIDEO_DISLIKE', id)
        resolve()
      })
    })
  },
  removeVideoDislike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var queries = {
        idVideo : id,
        idUser : state.current.id
      }
      userService.removevideoDislike(queries).then(() => {
        commit('REMOVE_VIDEO_DISLIKE', id)
        resolve()
      })
    })
  },
  //comment likes dislikes
  addCommentLike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var request = {
        idUser: state.current.id,
        idVideo: id.videoId,
        idComment: id.commentId
      }
      userService.addcommentLike(request).then(() => {
        commit('ADD_COMMENT_LIKE', id)
        resolve()
      })
    })
  },
  removeCommentLike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var queries = {
        idUser: state.current.id,
        idVideo: id.videoId,
        idComment: id.commentId
      }
      userService.removecommentLike(queries).then(() => {
        commit('REMOVE_COMMENT_LIKE', id)
        resolve()
      })
    })
  },
  addCommentDislike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var request = {
        idUser: state.current.id,
        idVideo: id.videoId,
        idComment: id.commentId
      }
      userService.addcommentDislike(request).then(() => {
        commit('ADD_COMMENT_DISLIKE', id)
        resolve()
      })
    })
  },
  removeCommentDislike: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      var queries = {
        idUser: state.current.id,
        idVideo: id.videoId,
        idComment: id.commentId
      }
      userService.removecommentDislike(queries).then(() => {
        commit('REMOVE_COMMENT_DISLIKE', id)
        resolve()
      })
    })
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
  updateUser: ({commit}, update)=>{
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)
      userService.updateUser(update.updatedUser).then((res) => {
        commit('UPDATE_USER', res.data.code)
        commit('SET_LOADING', false)
        resolve()
      })
    })
  },
  visitAccount: ({commit}, id)=>{
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)
      userService.getUser(id).then((data) => {
        commit('VISIT_ACCOUNT', data.data.data)
        commit('SET_LOADING', false)
        resolve()
      })
    })
  },
  //add remove subscriptions
  addSbuscription: ({commit})=>{
    return new Promise((resolve, reject) => {
      var request = {
        id: state.visited.id,
        subscribers: state.visited.subscribers+1
      }
      userService.updateSubscribers(request).then(() => {
        var request1 = {
          idSubscriber: state.current.id,
          idSubscribed: state.visited.id
        }
        userService.addSubscription(request1).then(() => {
          commit('ADD_SUBSCRIPTION')
          resolve()
        })
      })
    })
  },
  removeSbuscription: ({commit})=>{
    return new Promise((resolve, reject) => {
      var request = {
        id: state.visited.id,
        subscribers: state.visited.subscribers - 1
      }
      userService.updateSubscribers(request).then(() => {
        var queries = {
          idUser : state.current.id,
          idSub : state.visited.id
        }
        userService.removeSubscription(queries).then(() => {
          commit('REMOVE_SUBSCRIPTION')
          resolve()
        })
      })
    })
  },
  //delete user
  deleteUser: ({commit},id)=>{
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)
      userService.deleteUser(id).then(() => {
        commit('SET_LOADING', false)
        resolve()
      })
    })
  },
  //add remove admin
  addAdmin: ({commit},id)=>{
   return new Promise((resolve,reject)=>{
       commit('SET_LOADING', true)
       userService.addAdmin(id).then(() => {
         commit('SET_LOADING', false)
         resolve()
       })
   })
  },
  removeAdmin: ({commit},id)=>{
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)
      userService.removeAdmin(id).then(() => {
        commit('SET_LOADING', false)
        resolve()
      })
    })
  },
  getUser:({commit},id)=>{
    return new Promise((resolve, reject) => {
      commit('SET_LOADING', true)
      userService.getUser(id).then((data) => {
        commit('GET_USER', data.data.data)
        commit('SET_LOADING', false)
        resolve()
      })
    })
  }
}

export const user = {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
