import Axios from 'axios'

export const projectService = {
  fetchProjects(request) {
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
      Axios.get('http://localhost:8000/api/v1/projects', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  createProject(project) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      var f = new FormData()
      f.append('videoProject', project.video)
      f.append('thumbnail', project.thumbnail)
      f.append('userId', project.userId)
      f.append('title', project.title)
      Axios.post('http://localhost:8000/api/v1/project', f, config).then(
          (res) => {
            resolve(res)
          })
        .catch(error => console.log(error))
    })
  },
  initShapes(request) {
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
      Axios.get('http://localhost:8000/api/v1/sahpes', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  initPictures(request) {
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
      Axios.get('http://localhost:8000/api/v1/user/pictures', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
}
