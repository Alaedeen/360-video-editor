<template>
<div >

        <v-card dark >
          <v-img
            :src="'http://localhost:8000/assets/project/videos/thumbnails/'+project.thumbnail"
            height= "7em"
            @click="edit(project.ID)"
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
                @click="shareProject"
              >
                <v-icon>share</v-icon>
              </v-btn>

              <p class="text-sm-left" > <b> {{project.title}} </b> </p>
          </v-card-text>

        </v-card>

          <v-dialog
        v-model="dialog"
        max-width="350"
      >
        <v-card>
          <v-card-title class="headline">Make a sharing request!</v-card-title>

          <v-card-text>
            Are you sure!! <br> By pressing yes you are going to send a sharing request, this video <b> "{{project.title}}"</b> won't be public without the administration aproval.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              YES
            </v-btn>

            <v-btn
              color="yellow darken-1"
              flat="flat"
              @click="dialog = false"
            >
              NO
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</div>
</template>

<script>
export default {
  props: ['project'],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    edit(id){
      var url = '/edit/'+id
      this.$router.push({path:url})
    },
    shareProject(){
      this.dialog=true
    }
  },

}
</script>

<style>

</style>
