<template>
<div >

        <v-card dark >
          <v-img
            :src="project.thumbnail"
            height="7em"
            style=" padding-top: 36.25%;"
          >
          </v-img>
              <p class="text-sm-left" style="padding: 0.5em"> <b> {{project.title}} </b> </p>
        </v-card>

</div>
</template>

<script>
export default {
  props: ['project'],

}
</script>

<style>

</style>
