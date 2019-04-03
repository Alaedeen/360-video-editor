<template>
<div style="margin-top: -1.5em; margin-bottom: 1.5em">

  <!-- fix x -->
  <v-layout row style="height :3em">
  <v-flex class="pr-3" style="margin-top:0.85em" ><v-slider  v-model="propriety.x" max="180" min="-180" step="1"  color="white" track-color="grey" ></v-slider></v-flex>
  <v-flex  shrink style="width: 46px; "> <v-text-field dark v-model="propriety.x" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
  </v-layout>

  <!-- fix y -->
  <v-layout row style="height :3em">
  <v-flex class="pr-3" style="margin-top:0.85em"><v-slider  v-model="propriety.y" max="180" min="-180" step="1"  color="white" track-color="grey" ></v-slider></v-flex>
  <v-flex shrink style="width: 46px;"> <v-text-field dark v-model="propriety.y" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
  </v-layout>

  <!-- fix z -->
  <v-layout row style="height :3em">
  <v-flex class="pr-3" style="margin-top:0.85em"><v-slider  v-model="propriety.z" max="180" min="-180" step="1"  color="white" track-color="grey" ></v-slider></v-flex>
  <v-flex shrink style="width: 46px;"> <v-text-field dark v-model="propriety.z" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
  </v-layout>
</div>
</template>

<script>
export default {
  props:{
    propriety: {
      type: Object
    }
  }

}
</script>

<style scoped>

</style>

