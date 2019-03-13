<template>
  <div>
  <v-app id="inspire">
    <v-toolbar
    app
               dark
               height='70em'
               style="padding-left : 0px;">
      <v-toolbar-title style="cursor: pointer">360° video editor</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-text-field
          hide-details
          single-line
          label="Search"
           outline
           clearable
        ></v-text-field>
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
}
</script>

<style scoped>
.nav-link{
  color: white;
}
</style>


