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
              v-model="search"></v-text-field>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        dark
      >
        <template v-slot:items="props" >
          <tr style="cursor: pointer" >
            <td class="text-xs-center"><app-edit :user="props.item" :action="'admin'" style="padding: 0.3em"></app-edit></td>
            <td class="text-xs-center" >{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.joined.month }} {{ props.item.joined.day }}, {{ props.item.joined.year }}</td>
          <td><v-btn color="#ff4646" @click="removeBtn(props.item.id,props.item.name)">remove admin</v-btn></td>
          </tr>
        </template>
      </v-data-table>

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
                      @click="removeAdmin(id)"
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
import ProfileEdit from '../accounts/UpdateProfile.vue'
export default {
  data() {
    return {
      headers: [
        { text: 'Edit',align: 'center',sortable: false, value: 'edit' },
        { text: 'User name',align: 'center',sortable: false,value: 'user name' },
        { text: 'Email ',align: 'center',sortable: false, value: 'email' },
        { text: 'Joined',align: 'center', sortable: false,value: 'joined' },
        { text: '',align: 'center',sortable: false, value: '' },
      ],
      search: '',
      dialog1: false,
      name:'',
      id: 0
    }
  },
  components: {
  appEdit: ProfileEdit
},
computed: {
  users(){
    var all= this.$store.state.user.users.filter(user => {
      return user.roles.length==2
    });
    return all.filter(one => {
      return one.name.toUpperCase().includes(this.search.toUpperCase())
    });
  }
},
watch: {
    search: function (val) {
      if (val==null) {
        this.search=''
      }
    },
  },
  methods: {
    removeBtn(id,name){
      this.id=id
      this.name=name
      this.dialog1 = true
    },
    removeAdmin(id){
      this.dialog1 = false
      this.$store.dispatch('user/removeAdmin',id)
    }
  },
}
</script>

<style scoped>

</style>

