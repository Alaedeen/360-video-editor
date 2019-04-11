<template>
<div>
   <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex v-for="project in projects" :key="project.projectId" @click="edit(project.projectId)" xs2>
                <app-tile style="cursor: pointer" :project="project"></app-tile>
              </v-flex>
            </v-layout>
          </v-container>


</div>
</template>

<script>
import projectTile from './projectTile.vue'
export default {
  data() {
    return {

    }
  },
components: {
    appTile: projectTile
  },
  computed: {
    projects(){
        return this.$store.state.project.projects
    },
  },
  methods: {
    edit(id){
      var url = '/edit/'+id
      this.$router.push({path:url})
    }
  },
}
</script>

<style scoped>

</style>


