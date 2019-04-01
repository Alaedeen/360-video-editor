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
  name: 'Users_Management'
},
{
  path: '/admins_management',
  component: AdminsManagement,
  name: 'Admins_Management'
},
{
  path: '/upload_requests',
  component: UploadRequests,
  name: 'Upload_Requests'
},
{
  path: '/complains_management',
  component: ComplainsManagement,
  name: 'Complains_Management'
},
{
  path: '/edit/:id',
  component: Editor,
  name: 'Editor'
}
]
