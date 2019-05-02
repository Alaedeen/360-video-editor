<template>
<div >

        <v-card dark >
          <v-img
            :src="project.thumbnail"
            height= "7em"
            @click="edit(project.projectId)"
            style="cursor: pointer"
          >
          </v-img>
          <v-card-text
          style="position: relative; padding-bottom: 0.1em" >
                <v-btn
                absolute
                color="red"
                class="white--text"
                fab
                small
                right
                top
              >
                <v-icon>share</v-icon>
              </v-btn>

              <p class="text-sm-left" > <b> {{project.title}} </b> </p>
          </v-card-text>

        </v-card>

</div>
</template>

<script>
export default {
  props: ['project'],
  methods: {
    edit(id){
      var url = '/edit/'+id
      this.$router.push({path:url})
    }
  },

}
</script>

<style>

</style>
