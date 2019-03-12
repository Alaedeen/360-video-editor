<template>
  <div>

    <div class="pos-f-t" >

      <nav class="navbar navbar-dark " style="backgroundColor: #444444;">
        <router-link to="/" class="navbar-brand" >360° Videos Editor</router-link >

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


