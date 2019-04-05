<template>
<div style="margin-right: -5em;">
        <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-flex

                xs6
                v-for="(shape, index) in shapes" :key="index"
              >
                <v-card flat tile>
                  <v-img
                    style="cursor:pointer"
                    :src="shape.icon"
                    aspect-ratio="1"
                    class="white lighten-2"
                    @click="shape.function"
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
  shapes : {
    type: Array,
    default: []
  },
},
data () {
      return {

      }
    }

}
</script>

<style scoped>

</style>

