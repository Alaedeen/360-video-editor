<template>
<div >
  <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-card dark v-on="on">
          <v-img
            :src="vid.thumbnail"
            height="7em"
            style=" padding-top: 36.25%;"
          >
          </v-img>

          <!-- <v-card-title primary-title >
            <div> -->

              <p class="text-sm-left" style="padding: 0.5em"> <b> {{vid.title}} </b> </p>

              <!-- add filter to show only part of text -->
              <!-- <span class="grey--text" style="font-size: 0.7em">Uploaded {{vid.uploadDate.month}} {{vid.uploadDate.day}}, {{vid.uploadDate.year}} </span> -->
            <!-- </div>
          </v-card-title> -->



        </v-card>
        </template>
        <span>Uploaded {{vid.uploadDate.month}} {{vid.uploadDate.day}}, {{vid.uploadDate.year}}</span>
      </v-tooltip>
</div>
</template>

<script>
export default {
  props: ['vid'],

}
</script>

<style>

</style>

