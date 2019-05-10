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
}
