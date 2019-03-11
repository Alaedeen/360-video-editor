import Login from './Components/accounts/Login.vue'
import SignUp from './Components/accounts/SignUp.vue'
import Home from './Components/Home.vue'

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
  path: '/login',
  component: Login,
  name: 'login'
},
 {
  path: '/sign_up',
  component: SignUp,
  name: 'signup'
},
]
