import Axios from 'axios'

export const videoService = {
  fetchVideos(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          offset: request.offset,
          limit: request.limit,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/videos', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  filterVideos(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          title: request.title,
          offset: request.offset,
          limit: request.limit,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/videosByTitle', config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  userVideos(request){
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: request.id,
          offset: request.offset,
          limit: request.limit,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/user/videos', config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  loadVideo(id) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/video', config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  updateVideo(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: request.id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.put('http://localhost:8000/api/v1/video', request.video,config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addComment(comment) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/comment', comment, config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  updateComment(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: request.id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.put('http://localhost:8000/api/v1/comment', request.comment, config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  addReply(reply) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/reply', reply, config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  updateReply(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: request.id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.put('http://localhost:8000/api/v1/reply', request.reply, config)
        .then(
          data => {
            resolve(data)
          }
        )
        .catch(error => console.log(error))
    })
  },
  loadVideoScript(fileName) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          file: fileName
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/project/script', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
}
