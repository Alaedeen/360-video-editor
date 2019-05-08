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
      })
  }
}
