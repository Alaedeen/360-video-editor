<template>
<div>
  <div class="row">
    <div class="col">
      <app-side></app-side>
    </div>
    <div class="col">
      <h1>Content</h1>
    </div>
  </div>
</div>
</template>

<script>
import SideBar from './Menus/SideBar.vue'
export default {
components: {
    appSide: SideBar
  }
}
</script>

<style scoped>

</style>


