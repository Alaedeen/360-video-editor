<template>
<div style="margin-top:1em; overflow-y: scroll;overflow-x: hidden;  ">
  <!-- fix shape position -->
  <b style="color :white ">Position : {x,y,z}</b>
  <app-sliders :propriety="shapeDetails.position"></app-sliders>

  <!-- fix shape Rotation -->
  <div v-if="!shapeDetails.tag">
  <b style="color :white">Rotation : {x,y,z}</b>
  <app-sliders :propriety="shapeDetails.rotation"></app-sliders>
  </div>

  <!-- fix shape Color -->
  <div v-if="!shapeDetails.tag && !shapeDetails.image && !shapeDetails.video">
  <b style="color :white">Color:</b>
  <swatches-picker v-model="shapeDetails.material.color" show-fallback :colors="colors" row-length=8 swatch-size=30  ></swatches-picker>
  </div>

  <!-- fix shape Scale -->
  <div v-if="!shapeDetails.tag" style="margin-left:3em;">
  <b style="color :white">Scale:</b>
  <v-layout row style="height :3em; margin-top: -2em; margin-bottom: 2em">
  <v-flex xs9 class="pr-3" style="margin-top:0.85em;"><v-slider  v-model="shapeDetails.scale.size" max="10" min="0.1" step="0.1"  color="white" track-color="grey" ></v-slider></v-flex>
  <v-flex shrink style="width: 46px;"> <v-text-field dark v-model="shapeDetails.scale.size" max="10" min="0.1" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
  </v-layout>
  </div>

  <!-- fix shape Periode -->
  <b style="color :white; margin-bottom: 2em">Periode (in seconds):</b>
  <v-layout row style="height :3em; margin-top: -1em; margin-left: 2em">
  <v-flex xs2 style="margin-top:2em" ><p style="color :white;">From: </p></v-flex>
  <v-flex  shrink style="width: 60px;margin-right:1em"> <v-text-field dark v-model="shapeDetails.period.startTime" min="0" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
  <v-flex xs2 style="margin-top:2em"><p style="color :white;">To: </p></v-flex>
  <v-flex shrink style="width: 60px;"> <v-text-field dark v-model="shapeDetails.period.endTime" min="0" class="mt-0" hide-details single-line type="number" ></v-text-field> </v-flex>
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
/* width */
::-webkit-scrollbar {
  width: 0.1em;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #000;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

