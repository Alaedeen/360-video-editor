<template>
  <div>

    <div class="pos-f-t" >

      <nav class="navbar navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand" href="#">360° Videos Editor</router-link >

        <router-link to="/login"  class="btn btn-outline-light" v-if="current==null">Login</router-link>
      </nav>

    </div>

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


