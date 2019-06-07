<template>
  <div>

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
          <td><v-btn color="#1487F9" @click="true">watch video</v-btn></td>
          <td><v-btn color="#ff4646" @click="true">decline request</v-btn></td>
          <td><v-btn color="#5aad5a" @click="true">approve request</v-btn></td>
          </tr>
        </template>
      </v-data-table>

      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" dark color="black" ></v-pagination>
      </div>

      <!-- remove admin dialog -->
            <v-dialog
                v-model="dialog1"
                min-width="350"
                max-width="400"
              >
                <v-card >
                  <v-card-title class="headline">Remove {{name}} as an admin?</v-card-title>

                  <v-card-text>
                    Are you sure ?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      flat="flat"
                      @click="dialog1 = false"
                    >
                      no
                    </v-btn>

                    <v-btn
                      color="red darken-1"
                      flat="flat"
                      @click="removeAdminHandler(id)"
                    >
                      yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <!-- remove admin dialog end -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import _ from 'lodash'
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
      dialog1: false,
      name:'',
      id: 0,
      pagination: {
        descending: false,
        rowsPerPage: 8,
        page:1
      },
      pageRequests : []
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
    }),
    removeBtn(id,name){
      this.id=id
      this.name=name
      this.dialog1 = true
    },

  },
  beforeCreate() {
    var request = {
      offset: 0,
      limit: 8
    }
    this.setRequests(request)
  },
}
</script>

<style scoped>

</style>

