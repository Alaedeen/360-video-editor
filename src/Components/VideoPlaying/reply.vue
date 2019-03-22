<template>
<div>
  <div >
   <v-avatar style="display: inline-block;" size= '40'>
      <img :src="'/'+reply.profilePic">
    </v-avatar>
    <p style="color: grey; display: inline-block; marginLeft: 1em">
      <b> {{reply.nameUser}} </b>
    </p>
    <p style="color: white;marginLeft: 5em">
      {{reply.text}}
    </p>
    </div>
    <p style="paddingLeft: 5em;">
        <span style="color: grey; "><v-icon color="grey" style="cursor : pointer;" small>thumb_up</v-icon> {{reply.likes}} </span>
        <span style="color: grey;"><v-icon color="grey" style="cursor : pointer; padding-left : 1em;" small>thumb_down</v-icon> {{reply.dislikes}} </span>
    </p>
</div>
</template>

<script>
export default {
props : {
    reply: {
      type : Object,
      default: {}
    }
  },
}
</script>

<style scoped>

</style>

