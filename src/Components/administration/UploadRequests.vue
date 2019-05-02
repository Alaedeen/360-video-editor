<template>
  <div>
    upload
  </div>
</template>

<script>
export default {
beforeCreate() {
      if ((this.$store.state.user.current==null)||(this.$store.state.user.current.roles.length==1)) {
        this.$router.push({ path: '/' })
      }
    },
}
</script>

<style scoped>

</style>

