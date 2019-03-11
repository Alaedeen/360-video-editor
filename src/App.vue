<template>
  <div >
      <app-header></app-header>
  </div>
</template>

<script>
import Header from './Components/Header.vue'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    appHeader: Header
  }
}
</script>

<style>

</style>
