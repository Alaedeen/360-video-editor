<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    dark
    stateless
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="current!=null">
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content v-if="current!=null">
            <v-list-tile-title>{{ current.name }}</v-list-tile-title>
          </v-list-tile-content>


          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>view_headline</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>


    <v-list class="pt-0" dense>
      <v-divider></v-divider>

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
        items: [
          { title: 'Home', icon: 'dashboard' , to:''},
        ],
        mini: true,
        right: null
      }
    },
    methods: {
      goto(item){
          this.$router.push({ path: '/' + item.to });
      }
    },
    computed: {
      current() {
        return this.$store.state.user.current
      },
      logOut(){
        this.$store.dispatch('user/logOut');
        window.location.reload()
        this.$router.push({ path: '/' })
      }
    },
    created() {
      if(this.current==null){
        this.items.splice(0,0,{ title: 'Login', icon: 'account_circle' ,to:'login'})
      }
    },
  }
</script>
