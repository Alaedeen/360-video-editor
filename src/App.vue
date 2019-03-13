<template>
  <div >
            <app-header style="position: fixed;" v-if="!home"></app-header>
                <transition name="slide" mode="out-in">
                    <router-view style="padding-top: 3em;"></router-view>
                </transition>

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
      return this.$store.state.home
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
