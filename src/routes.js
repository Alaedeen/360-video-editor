import Login from './Components/accounts/Login.vue'
import SignUp from './Components/accounts/SignUp.vue'
import Home from './Components/Home.vue'
import MyProfile from './Components/accounts/Profile.vue'
import VideoWatching from './Components/VideoPlaying/videoWatching.vue'

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
{
  path: '/my_profile',
  component: MyProfile,
  name: 'myprofile'
}, {
  path: '/watch/:id',
  component: VideoWatching,
  name: 'videoWatching'
},
]
