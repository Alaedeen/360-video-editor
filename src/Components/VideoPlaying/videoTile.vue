<template>
<div >
        <v-card>
          <v-img
            :src="vid.thumbnail"
            height="140px"
            :aspect-ratio="16/9"
          >
          </v-img>

          <v-card-title primary-title >
            <div>
              <p class="text-sm-left"> <b> {{vid.title}} </b> </p>
              <!-- add filter to show only part of text -->
              <span class="grey--text">Uploaded {{vid.uploadDate.month}} {{vid.uploadDate.day}}, {{vid.uploadDate.year}} </span>
            </div>
          </v-card-title>



        </v-card>
</div>
</template>

<script>
export default {
  props: ['vid'],

}
</script>

<style>

</style>

