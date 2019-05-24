<template>
  <div >
                <app-header ></app-header>
                <v-layout row wrap>
                <v-flex xs2  v-if="side">
                  <app-side></app-side>
                </v-flex>
                <v-flex >
                  <transition name="slide" mode="out-in">
                    <router-view style="padding-top: 5em; background-color: 	#444444; padding-left: 2em; padding-right: 2em;"></router-view>
                </transition>
                </v-flex>
                </v-layout>

  </div>

</template>

<script>
import Header from './Components/Menus/Header.vue'
import SideBar from './Components/Menus/SideBar.vue'
export default {
  name: 'app',
  components: {
    appSide: SideBar,
    appHeader: Header,
  },
  computed: {
    side() {
      return this.$store.state.home.side
    }
  },
  data () {
    return {

    }
  },
  created() {
          this.$store.dispatch('user/initCurrent');
          this.$store.dispatch('video/initAll');
          this.$store.dispatch('project/initPictures');
          this.$store.dispatch('project/initVideos');
          this.$store.dispatch('project/initFonts');
        },
}
</script>

<style>
body{
  background-color: 	#444444;
}
.slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>
