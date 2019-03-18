import Login from './Components/accounts/Login.vue'
import SignUp from './Components/accounts/SignUp.vue'
import Home from './Components/Home.vue'
import MyProfile from './Components/accounts/Profile.vue'
import VideoPlayer from './Components/VideoPlaying/videoPlayer.vue'

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
  component: VideoPlayer,
  name: 'player'
},
]
