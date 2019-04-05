<template>
  <v-navigation-drawer
    v-model="drawer"
    hide-overlay
    dark
    app
      fixed
      permanent
   style="width: 18%; backgroundColor: 	#262626;margin-top: 5em;"
  >

    <v-toolbar flat class="transparent" v-if="current!=null">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar >
            <img :src="current.profilePic">
          </v-list-tile-avatar>

          <v-list-tile-content
          @click="goToProfile()"
          style="cursor : pointer">
            <v-list-tile-title>{{ current.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-toolbar>
    <v-divider v-if="current!=null"></v-divider>

    <v-list class="pt-0" dense>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="goto(item)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <div v-if="current!=null">
        <v-divider></v-divider>
      <v-list-tile @click="logOut()">
        <v-list-tile-action>
          <v-icon> exit_to_app </v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      </div>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        mini: true,
        right: null
      }
    },
    methods: {
      goto(item){
          this.$router.push({ path: '/' + item.to });
      }
      ,
      logOut(){
        this.$store.dispatch('user/logOut');
        window.location.reload()
        this.$router.push({ path: '/' })
      },
      goToProfile(){
        this.$router.push({ path: '/my_profile' })
      }
    },
    computed: {
      current() {
        return this.$store.state.user.current
      },
      items(){
        if(this.current==null){
          return []
        }else {
          if (this.current.roles.length==3) {
              return [
              { title: 'Users management', icon: 'supervised_user_circle' , to:'users_management'},
              { title: 'Admins management', icon: 'accessibility' , to:'admins_management'},
              { title: 'Video upload requests', icon: 'subscriptions' , to:'upload_requests'},
              { title: 'Complains management', icon: 'priority_high' , to:'complains_management'},
              { title: 'Library', icon: 'video_library' , to:'edit/0'},
              ]
          }else if (this.current.roles.length==2) {
            return [
              { title: 'Users management', icon: 'supervised_user_circle' , to:'users_management'},
              { title: 'Video upload requests', icon: 'subscriptions' , to:'upload_requests'},
              { title: 'Complains management', icon: 'priority_high' , to:'complains_management'},
              { title: 'Library', icon: 'video_library' , to:'edit/0'},
              ]
          } else{
            return [
              { title: 'Library', icon: 'video_library' , to:'edit/0'},
              ]
          }

        }

      }
    },
    created() {
      if(this.current==null){
        this.items.splice(0,0,{ title: 'Login', icon: 'account_circle' ,to:'login'})
      }
    },
  }
</script>
