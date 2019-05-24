<template>
<div style="overflow-y: scroll;overflow-x: hidden; margin-right: -5em; height: 40em">

  <v-container  grid-list-sm fluid>

            <v-layout row wrap>
              <v-flex xs12 v-for="(font, index) in textAdding.fonts " :key="index"  >
                <v-card dark flat tile style="cursor: pointer" @click="addText(font)" >
                    <v-img :src="'http://localhost:8000/assets/project/fonts/'+font.src" ></v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
</div>
</template>

<script>
import Vue from 'vue'
var EventBus = new Vue()
export default {
  props: {
  textAdding : {
    type: Object,
    default: {}
  },
  },
  data() {
    return {

    }
  },

  methods: {
    addText(font){
      this.$store.dispatch('project/addElement',{
        element:font,
        duration: this.textAdding.duration,
        mode: this.textAdding.mode.mode
      })
      this.textAdding.mode.mode='free'
    }
  },

}
</script>

<style scoped>

</style>

