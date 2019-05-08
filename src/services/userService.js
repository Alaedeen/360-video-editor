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
  }
}
