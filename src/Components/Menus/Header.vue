<template>
  <div>
  <v-app id="inspire">
    <v-toolbar
    app
               dark
               height='70em'
               style="padding-left : 0px;">
      <v-toolbar-title style="cursor: pointer" @click="gohome()">360° video editor</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
  </v-app>
</div>
</template>

<script>
export default {
    computed: {
      current() {
        return this.$store.state.user.current
      }
    },
    methods: {
      gohome(){
        this.$router.push({path : '/'})
      }
    },
}
</script>

<style scoped>
.nav-link{
  color: white;
}
</style>


