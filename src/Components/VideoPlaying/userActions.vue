<template>
<div>
  <v-btn style="color: grey; " v-for="(item, index) in items" :key="index" depressed fab flat small @click="item.func"><v-icon :color="item.color" style="cursor : pointer;" > {{item.icon}} </v-icon> {{item.label}} </v-btn>
</div>
</template>

<script>
export default {
props: {
  items : {
    type: Array,
    default: []
  },
},
methods:{
  onLike(){
    this.likeVideo()
  },
  onDislike(){
    this.dislikeVideo()
  }
},mounted() {
  // console.log(this.items)
},
}
</script>

<style scoped>

</style>

