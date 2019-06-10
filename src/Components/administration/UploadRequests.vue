<template>
  <div>
      <div v-if="video==null">
        <v-data-table
          :headers="headers"
          :items="pageRequests"
          class="elevation-1"
          dark
          hide-actions
          :pagination.sync="pagination"
        >
          <template v-slot:items="props" >
            <tr style="cursor: pointer" >
              <td class="text-xs-center" >{{ props.item.title }}</td>
              <td class="text-xs-center" >{{ props.item.userId }}</td>
            <td><v-btn color="#1487F9" @click="playVideo(props.item)">watch video</v-btn></td>
            <td><v-btn color="#ff4646" @click="OpenDeleteDialog(props.item.ID)">decline request</v-btn></td>
            <td><v-btn color="#5aad5a" @click="OpenApproveDialog(props.item)">approve request</v-btn></td>
            </tr>
          </template>
        </v-data-table>

        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" dark color="black" ></v-pagination>
        </div>
      </div>


      <div v-if="video!=null">

        <!-- video player -->
          <app-player  :video="video"></app-player>
        <!-- video player end-->
        <v-btn dark color="#ff4646" style="margin-left:15em;margin-top:-6em;" @click="video=null"> close preview</v-btn>
      </div>

      <!-- Decline Request Dialog -->
      <v-dialog
        v-model="dialog"
        max-width="350"
      >
        <v-card>
          <v-card-title class="headline">Decline Sharing Request?</v-card-title>

          <v-card-text> Are you sure? </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              No
            </v-btn>

            <v-btn
              color="red darken-1"
              flat="flat"
              @click="deleteUploadRequest"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Approve Request Dialog -->
      <v-dialog
        v-model="dialog2"
        max-width="350"
      >
        <v-card v-if="videoRequest!=null">
          <v-card-title class="headline">Approve {{videoRequest.title}} Sharing Request?</v-card-title>

          <v-card-text> Are you sure? </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="yellow darken-1"
              flat="flat"
              @click="dialog2 = false"
            >
              No
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="approveUploadRequest"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import player from '../VideoPlaying/player'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      headers: [
        { text: 'Video Title',align: 'center',sortable: false, value: 'edit' },
        { text: 'User ID',align: 'center',sortable: false,value: 'user ID' },
        { text: ' ',align: 'center',sortable: false, value: 'email' },
        { text: '',align: 'center', sortable: false,value: 'joined' },
        { text: '',align: 'center',sortable: false, value: '' },
      ],
      search: '',
      dialog: false,
      dialog1: false,
      dialog2: false,
      name:'',
      id: 0,
      pagination: {
        descending: false,
        rowsPerPage: 8,
        page:1
      },
      pageRequests : [],
      title : '',
      video :null,
      ID: 0,
      videoRequest:null
    }
  },
computed: {
  pages(){
    return Math.ceil(this.$store.state.project.requestsCount/8)
  },
  requests(){
    return this.$store.state.project.uploadRequests
  }
},
watch: {

     pagination: {
      handler(val){
          var request = {
            offset: (val.page * 8)-8,
            limit: 8
          }
          this.setRequests(request)
      },
      deep:true
    },
    requests: function (val){
        this.pageRequests=[]
        for (let index = 0; index < (this.pagination.page*8)-8; index++) {
            this.pageRequests.push(null)
        }
        for (let index = (this.pagination.page*4)-4; index < (this.pagination.page*8)-(8-val.length); index++) {
          this.pageRequests.push(val[index-((this.pagination.page*8)-8)])

      }

    }
  },
  methods: {
    ...mapActions({
      setRequests:'project/fetchUploadRequests',
      deleteRequest: 'project/deleteUploadRequest',
      approveRequest: 'project/approveUploadRequest'
    }),
    removeBtn(id,name){
      this.id=id
      this.name=name
      this.dialog1 = true
    },
    playVideo(request){
      this.title=request.title
      this.video = {
        src : request.src,
        aFrame: request.aFrame
      }
    },
    deleteUploadRequest(){
      this.deleteRequest(this.ID).then(()=>{
        this.dialog=false
        var request = {
          offset: 0,
          limit: 8
        }
        this.setRequests(request)
      })
    },
    approveUploadRequest(){
      var video = {
        userId : this.videoRequest.userId,
        title: this.videoRequest.title,
        uploadDay : this.videoRequest.uploadDay,
        uploadMonth : this.videoRequest.uploadMonth,
        uploadYear: this.videoRequest.uploadYear,
        thumbnail :this.videoRequest.thumbnail,
        src: this.videoRequest.src,
        aFrame: this.videoRequest.aFrame,
        likes: 0,
        dislikes: 0,
        views:0
      }
      this.approveRequest(video).then(()=>{
        this.dialog2=false
        this.deleteRequest(this.videoRequest.ID).then(()=>{
          this.dialog=false
          var request = {
            offset: 0,
            limit: 8
          }
          this.setRequests(request)
        })
      })
    },
    OpenDeleteDialog(id){
      this.dialog=true
      this.ID=id
    },
    OpenApproveDialog(request){
      this.dialog2=true
      this.videoRequest=request
    },

  },
  Created() {
    var request = {
      offset: 0,
      limit: 8
    }
    this.setRequests(request)
  },
  components: {
    appPlayer: player,
  }
}
</script>

<style scoped>

</style>

