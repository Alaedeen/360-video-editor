<template>
  <v-navigation-drawer
    v-model="drawer"
    hide-overlay
    dark
    app
      fixed
      permanent
   style="width: 20%; backgroundColor: 	#262626;margin-top: 5em;"
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
          if (this.current.roles.includes('admin')) {
              return [
              { title: 'Dashboard', icon: 'dashboard' , to:'dashboard'},
              { title: 'Library', icon: 'video_library' , to:'library'},
              ]
          }else{
            return [
              { title: 'Library', icon: 'video_library' , to:'library'},
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
