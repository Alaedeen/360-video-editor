import Login from './Components/accounts/Login.vue'
import SignUp from './Components/accounts/SignUp.vue'
import Home from './Components/Home.vue'
import MyProfile from './Components/accounts/Profile.vue'
import VideoWatching from './Components/VideoPlaying/videoWatching.vue'
import VisitUserProfile from './Components/accounts/VisitUserProfile.vue'
import UsersManagement from './Components/administration/Users.vue'
import AdminsManagement from './Components/administration/Admins.vue'
import UploadRequests from './Components/administration/UploadRequests.vue'
import ComplainsManagement from './Components/administration/Complains.vue'
import Editor from './Components/projects/Editor.vue'
import Library from './Components/projects/Library.vue'
import Password from './Components/accounts/ForgotPassword.vue'

// import store from './store/store'

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
  path: '/login',
  component: Login,
  name: 'login',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') != null) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/reset_password',
  component: Password,
  name: 'reset_password',
  beforeEnter: (to, from, next) => {
    if ($cookies.get('user') != null) {
      next('/')
    } else {
      next(true)
    }
  }
},
 {
  path: '/sign_up',
  component: SignUp,
  name: 'signup',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') != null) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/my_profile',
  component: MyProfile,
  name: 'myprofile',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') == null) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/watch/:id',
  component: VideoWatching,
  name: 'videoWatching'
},
{
  path: '/visit/:id',
  component: VisitUserProfile,
  name: 'VisitUserProfile'
},
{
  path: '/users_management',
  component: UsersManagement,
  name: 'Users_Management',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') == null || $cookies.get('user').roles.length == 1) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/admins_management',
  component: AdminsManagement,
  name: 'Admins_Management',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') == null || $cookies.get('user').roles.length < 3) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/upload_requests',
  component: UploadRequests,
  name: 'Upload_Requests',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') == null || $cookies.get('user').roles.length == 1) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/complains_management',
  component: ComplainsManagement,
  name: 'Complains_Management',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') == null || $cookies.get('user').roles.length == 1) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/edit/:id',
  component: Editor,
  name: 'Editor',
    beforeEnter: (to, from, next) => {
      if ($cookies.get('user') == null) {
        next('/')
      } else {
        next(true)
      }
    }
},
{
  path: '/library',
  component: Library,
  name: 'Library',
  beforeEnter: (to, from, next) =>{
    if ($cookies.get('user') == null) {
      next('/')
    }else{
      next(true)
    }
  }
}
]
