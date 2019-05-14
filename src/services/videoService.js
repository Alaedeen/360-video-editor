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
  }
}
