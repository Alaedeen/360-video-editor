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
              @click="makeRequest"
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

       <!-- sharing video snackBar -->
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :top="true"
      >
        Your video sharing request has been sent!
        <v-btn
          color="red"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['project'],
  data() {
    return {
      dialog: false,
      snackbar: false,
      timeout: 4000,
    }
  },
  computed: {
    date(){
      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth()+1; //January is 0!
      var year = today.getFullYear();
      switch (month) {
        case 1: month='January'
          break;
        case 2: month='February'
          break;
        case 3: month='March'
          break;
        case 4: month='April'
          break;
        case 5: month='May'
          break;
        case 6: month='June'
          break;
        case 7: month='Jully'
          break;
        case 8: month='August'
          break;
        case 9: month='September'
          break;
        case 10: month='October'
          break;
        case 11: month='November'
          break;
        case 12: month='December'
          break;
      }
      return{day,month,year}
    }
  },
  methods: {
    ...mapActions({
      addUploadRequest:'project/addUploadRequest',
    }),
    edit(id){
      var url = '/edit/'+id
      this.$router.push({path:url})
    },
    shareProject(){
      this.dialog=true
    },
    makeRequest(){
      var request = {
        userId : this.project.userId,
        title: this.project.title,
        uploadDay : this.date.day,
        uploadMonth : this.date.month,
        uploadYear: this.date.year,
        thumbnail :this.project.thumbnail,
        src: this.project.video,
        aFrame: this.project.aFrame
      }
      this.addUploadRequest(request).then(()=>{
        this.dialog=false
        this.snackbar=true
      })
    }
  },

}
</script>

<style>

</style>
