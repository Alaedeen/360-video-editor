<template>
  <div>

    <v-toolbar
    app
               dark
               height='70em'
               style="padding-left : 0px;     ">
      <v-toolbar-side-icon @click="toggleside()"></v-toolbar-side-icon>
      <v-toolbar-title style="cursor: pointer">360° video editor</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-text-field
          hide-details
          single-line
          label="Search"
           outline
           clearable
        v-model="search"></v-text-field>
      <v-spacer></v-spacer>



      <v-badge left
      style="cursor: pointer"
      overlap
      color="red"
      v-if="current!= null">
        <template v-slot:badge>
          <span>6</span>
        </template>
        <v-icon
          large
          color="grey lighten-1"
        >
          notifications
        </v-icon>
      </v-badge>



    </v-toolbar>

</div>
</template>

<script>
export default {
  data() {
    return {
        notifications: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ],
    search:''
    }
  },
  watch: {
    search: function (val) {
      if (val==null) {
        this.search=''
      }
      this.$store.dispatch('video/filterVideos', val);
    },
  },
    computed: {
      current() {
        return this.$store.state.user.current
      }
    },
    methods: {
      toggleside(){
        this.$store.dispatch('home/toggleSide')
      }
    },
}
</script>

<style scoped>
.nav-link{
  color: white;
}
</style>


