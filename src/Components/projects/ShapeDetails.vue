<template>
<div style="margin-top:1em">
  <!-- fix shape position -->
  <b style="color :white ">Position : {x,y,z}</b>
  <app-sliders :propriety="shapeDetails.position"></app-sliders>

  <!-- fix shape Rotation -->
  <b style="color :white">Rotation : {x,y,z}</b>
  <app-sliders :propriety="shapeDetails.rotation"></app-sliders>

  <!-- fix shape Color -->
  <b style="color :white">Color:</b>
  <swatches-picker v-model="shapeDetails.material.color" show-fallback :colors="colors" row-length=8 swatch-size=30  ></swatches-picker>

  <!-- fix shape Scale -->
  <b style="color :white">Scale:</b>
  <v-layout row style="height :3em">
  <v-flex class="pr-3" style="margin-top:0.85em"><v-slider  v-model="shapeDetails.scale.size" max="10" min="0.1" step="0.1"  color="white" track-color="grey" ></v-slider></v-flex>
  <v-flex shrink style="width: 46px;"> <v-text-field dark v-model="shapeDetails.scale.size" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
  </v-layout>
</div>
</template>

<script>
import Sliders from './Sliders.vue'
import Swatches from 'vue-swatches'
  // Import the styles too, globally
  import "vue-swatches/dist/vue-swatches.min.css"
export default {
  components:{
    appSliders: Sliders,

    'swatches-picker': Swatches
  },
props: {
  shapeDetails : {
    type: Object
  },
},
data() {
  return {
    colors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]
  }
},
}
</script>

<style scoped>

</style>

