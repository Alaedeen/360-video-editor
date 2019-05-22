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
}
