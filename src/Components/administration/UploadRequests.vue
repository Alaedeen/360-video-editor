<template>
  <div>
      <v-flex  xs12 style="margin: 2em">
        <v-text-field
              hide-details
              single-line
              label="Search"
              outline
              color="grey"
              clearable
              v-model="search" @input="filter"></v-text-field>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="pageUsers"
        class="elevation-1"
        dark
        hide-actions
        :pagination.sync="pagination"
      >
        <template v-slot:items="props" >
          <tr style="cursor: pointer" >
            <td class="text-xs-center" >{{ props.item.title }}</td>
            <td class="text-xs-center" >{{ props.item.name }}</td>
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
        { text: 'User name',align: 'center',sortable: false,value: 'user name' },
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
        rowsPerPage: 4,
        page:1
      },
      pageUsers : [
        {
          title : 'Sousse Tour',
          name: 'Alaedeen Eloueryemmi'
        },
        {
          title : 'London Tour',
          name: 'Jon Snow'
        },
        {
          title : 'Metropolitan Museum of Art',
          name: 'Patrick Jane'
        },
        {
          title : 'Camp Nou',
          name: 'Leo Messi'
        },
      ]
    }
  },
computed: {
  pages(){
    return Math.ceil(this.$store.state.user.usersCount/4)
  },
  users(){
    return this.$store.state.user.users
  }
},
watch: {
    search: function (val) {
      if (val==null) {
        this.search=''
      }
      if (val=='') {
        var request = {
            role : 'admin',
            offset: 0,
            limit: 4
          }
          this.setUsers(request)
          this.pagination.page=1
      }
    },
     pagination: {
      handler(val){
        if (this.search=='') {
          var request = {
            role : 'admin',
            offset: (val.page * 4)-4,
            limit: 4
          }
          this.setUsers(request)
        }else{
           var request1 = {
            role : 'admin',
            name: this.search,
            offset: (val.page * 4)-4,
            limit: 4
          }
          this.filterUsers(request1)
        }

      },
      deep:true
    },
    // users: function (val){
    //     this.pageUsers=[]
    //     for (let index = 0; index < (this.pagination.page*4)-4; index++) {
    //         this.pageUsers.push(null)
    //     }
    //     for (let index = (this.pagination.page*4)-4; index < (this.pagination.page*4)-(4-val.length); index++) {
    //       this.pageUsers.push(val[index-((this.pagination.page*4)-4)])

    //   }

    // }
  },
  methods: {
    ...mapActions({
      setUsers:'user/setUsers',
      filterUsers: 'user/filterUsers',
      removeAdmin: 'user/removeAdmin'
    }),
    removeBtn(id,name){
      this.id=id
      this.name=name
      this.dialog1 = true
    },
    removeAdminHandler(id){
      this.dialog1 = false
      this.removeAdmin(id).then(()=>{
        var request = {
        role : 'admin',
        offset: 0,
        limit: 4
        }
        this.setUsers(request)
      })
    },
    filter: _.debounce(function()  {
      var request = {
        role : 'admin',
        name: this.search,
        offset: 0,
        limit: 4
      }
      this.filterUsers(request)
      this.pagination.page=1
    }, 500)

  },
  beforeCreate() {
    var request = {
      role : 'admin',
      offset: 0,
      limit: 4
    }
    this.setUsers(request)
  },
}
</script>

<style scoped>

</style>

