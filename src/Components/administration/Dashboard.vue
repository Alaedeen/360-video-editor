<template>
<div>
  <v-app class="tabs">
          <div>
            <v-tabs
              v-model="active"
              dark
              slider-color="red"
            >
              <v-tab
                v-for="tab in tabs"
                :key="tab"
                ripple
              >
                 {{ tab }}

              </v-tab>
              <v-tab-item
                v-for="tab in tabs"
                :key="tab"
              >
                <v-card flat  class="profile">
                  <div v-if="tab=='Users'" >
                    <app-users></app-users>
                  </div>
                  <div v-if="tab=='Admins'">
                    <app-admins></app-admins>
                  </div>
                  <div v-if="tab=='Video Upload Requests'">
                    <app-upload></app-upload>
                  </div>
                  <div v-if="tab=='Complains'">
                    <app-complains></app-complains>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs>


          </div>
        </v-app>
</div>
</template>

<script>
import Users from './Users.vue'
import Admins from './Admins.vue'
import Upload from './UploadRequests.vue'
import Complains from './Complains.vue'
export default {
  components:{
    appUsers: Users,
    appAdmins: Admins,
    appUpload: Upload,
    appComplains: Complains
  },
  data() {
      return {

      }
    },
  computed: {
      tabs(){
        return ['Users', 'Admins' ,'Video Upload Requests','Complains']
      }
  },
    // beforeCreate() {
    //   if (this.$store.state.user.current==null) {
    //     this.$router.push({ path: '/' })
    //   }
    // },
}
</script>

<style scoped>
.profile{
      background-color: 	#444444;
      color : white
}
.tabs{
  padding-top: 2em;
  background-color: 	#444444
}
</style>

