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
  loadProject(id) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: id
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.get('http://localhost:8000/api/v1/project', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  initVideos(request) {
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
      Axios.get('http://localhost:8000/api/v1/user/projectVideos', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  initFonts(request) {
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
      Axios.get('http://localhost:8000/api/v1/fonts', config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  saveProject(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          name: request.name,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.put('http://localhost:8000/api/v1/project/save', request.script, config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  loadProjectScript(fileName) {
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
  saveElement(element) {
    return new Promise((resolve, reject) => {
      var config = {
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.post('http://localhost:8000/api/v1/project/element', element, config).then((data) => {
          resolve(data)
        })
        .catch(error => console.log(error))
    })
  },
  updateProject(request) {
    return new Promise((resolve, reject) => {
      var config = {
        params: {
          id: request.id,
        },
        headers: {
          Authorization: "Bearer " + $cookies.get('token')
        }
      }
      Axios.put('http://localhost:8000/api/v1/project', request.elements, config).then((data) => {
        resolve(data)
      })
        .catch(error => console.log(error))
    })
  },
}
