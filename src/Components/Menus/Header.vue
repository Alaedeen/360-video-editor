<template>
  <div>

    <v-toolbar
    app
               dark
               height='70em'
               style="padding-left : 0px;     ">
      <v-toolbar-side-icon @click="toggleside()"></v-toolbar-side-icon>
      <v-toolbar-title  style="cursor: pointer; font-size: 1em" @click="gohome()"><img src="/logo.png" alt="360 Video Editor"></v-toolbar-title>
      <v-spacer></v-spacer>
    <v-text-field
          hide-details
          single-line
          label="Search"
           outline
           clearable
        v-model="search"
        v-if="home"
        @input="filter"></v-text-field>
      <v-spacer></v-spacer>



      <v-badge left

      style="cursor: pointer"
      overlap
      color="red"
      v-if="current!= null">
        <template
        v-slot:badge>
          <span  >6</span>
        </template>
        <v-icon
          class="bounce-7 box"
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
import _ from 'lodash'
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

    },
  },
    computed: {
    home() {
      return this.$store.state.home.header
    },
      current() {
        return this.$store.state.user.current
      }
    },
    methods: {
      toggleside(){
        this.$store.dispatch('home/toggleSide')
      },
      gohome(){
        this.$router.push({path : '/'})
      },
      filter: _.debounce(function()  {
        this.$store.dispatch('video/setSearch', this.search);
      }, 500)
    },
}
</script>

<style scoped>
.nav-link{
  color: white;
}
.box {
        align-self: flex-end;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        transform-origin: bottom;
    }
    .bounce-7 {
        animation-name: bounce-7;
        animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    }
    @keyframes bounce-7 {
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-20px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
    }
</style>


