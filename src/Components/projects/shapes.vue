<template>
<div style="margin-right: -5em;">
        <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex

                xs6
                v-for="(shape, index) in shapeAdding.shapes" :key="index"
              >
                <v-card flat tile>
                  <v-img
                    style="cursor:pointer"
                    :src="shape.icon"
                    aspect-ratio="1"
                    class="white lighten-2"
                    @click="addShape(shape)"
                  ></v-img>

                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
</div>
</template>

<script>
export default {
  props: {
  shapeAdding : {
    type: Object,
    default: {}
  },
},
data () {
      return {

      }
    },
    methods: {
      addShape(shape){
        this.$store.dispatch('project/addShape',{
          shape:shape,
        duration: this.shapeAdding.duration,
        mode: this.shapeAdding.mode
      })
      this.shapeAdding.mode='free'
      }
    },

}
</script>

<style scoped>

</style>

