<template>
  <div >

                <transition name="slide" mode="out-in">
                    <router-view style="padding-top: 5em; background-color: 	#444444;"></router-view>
                </transition>
                <app-header style="position: fixed;" v-if="!home"></app-header>
  </div>

</template>

<script>
import Header from './Components/Menus/Header.vue'
export default {
  name: 'app',
  components: {
    appHeader: Header,
  },
  computed: {
    home() {
      return this.$store.state.home.header
    }
  },
  data () {
    return {

    }
  },
  created() {
          this.$store.dispatch('user/initUsers');
          console.log(this.$store.state.user.users)
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
