import Axios from 'axios'
export const userService = {
  fetchUsers(request) {
      return new Promise((resolve, reject) => {
        var config = {
          params: {
            role: request.role,
            offset: request.offset,
            limit: request.limit,
          },
          headers: {
            Authorization: "Bearer " + $cookies.get('token')
          }
        }
        Axios.get('http://localhost:8000/api/v1/users', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
      })
  },
  filterUsers(request){
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          role: request.role,
          name: request.name,
          offset: request.offset,
          limit: request.limit,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/usersbyname', config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addUser(log){
    return new Promise((resolve, reject) => {
      Axios.post('http://localhost:8000/api/v1/users', log)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  signIn(user){
    return new Promise((resolve, reject) => {
      Axios.get('http://localhost:8000/api/v1/login', {
          params: {
            email: user.email,
            password: user.password
          }
        })
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/users', config) .then(() => {
            resolve()
          })
        .catch(error => console.log(error))
    })
  },
  addAdmin(id){
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      var f = new FormData()
      f.append('admin', true)
      Axios.put('http://localhost:8000/api/v1/users', f, config).then(
          () => {
            resolve()
          } )
        .catch(error => console.log(error))
    })
  },
  removeAdmin(id) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      var f = new FormData()
      f.append('admin', false)
      Axios.put('http://localhost:8000/api/v1/users', f, config).then(
          () => {
            resolve()
          })
        .catch(error => console.log(error))
    })
  },
  updateUser(user){
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: user.id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      var f = new FormData()
      f.append('name', user.name)
      f.append('email', user.email)
      if (user.password!=undefined) {
        f.append('password', user.password)
      }
      f.append('birthDay', user.dateOfBirth.day)
      f.append('birthMonth', user.dateOfBirth.month)
      f.append('birthYear', user.dateOfBirth.year)
      f.append('country', user.countryOfResidence)
      f.append('description', user.description)
      if (user.profilePic!='') {
        f.append('profilePicture', user.profilePic)
      }
      Axios.put('http://localhost:8000/api/v1/users', f, config).then(
          (res) => {
            resolve(res)
          })
        .catch(error => console.log(error))
    })
  },
  getUser(id){
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: id
        }
      }
      Axios.get('http://localhost:8000/api/v1/user', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  updateSubscribers(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: request.id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      var f = new FormData()
      f.append('subscribers', request.subscribers)
      Axios.put('http://localhost:8000/api/v1/users', f, config)
        .then(
          () => {
            resolve()
          }
        )
        .catch(error => console.log(error))
    })
  },
  addSubscription(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/subscriptions', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removeSubscription(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idUser: queries.idUser,
          idSub: queries.idSub
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/subscriptions', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addvideoLike(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/videosLikes', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removevideoLike(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idVideo: queries.idVideo,
          idUser: queries.idUser
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/videosLikes', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addvideoDislike(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/videosDislikes', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removevideoDislike(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idVideo: queries.idVideo,
          idUser: queries.idUser
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/videosDislikes', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addcommentLike(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/commentsLikes', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removecommentLike(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idVideo: queries.idVideo,
          idUser: queries.idUser,
          idComment: queries.idComment,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/commentsLikes', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addcommentDislike(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/commentsDislikes', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removecommentDislike(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idVideo: queries.idVideo,
          idUser: queries.idUser,
          idComment: queries.idComment,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/commentsDislikes', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addreplyLike(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/repliesLikes', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removereplyLike(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idVideo: queries.idVideo,
          idUser: queries.idUser,
          idComment: queries.idComment,
          idReply: queries.idReply
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/repliesLikes', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addreplyDislike(request) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/repliesDislikes', request, config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  removereplyDislike(queries) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          idVideo: queries.idVideo,
          idUser: queries.idUser,
          idComment: queries.idComment,
          idReply: queries.idReply
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.delete('http://localhost:8000/api/v1/repliesDislikes', config)
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(error => console.log(error))
    })
  },
  resetPassword(email){
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          email: email
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.put('http://localhost:8000/api/v1/user/reset_password', '',config)
        .then(
          (data) => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  }
}
