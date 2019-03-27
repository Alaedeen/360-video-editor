<template>
  <div>
    <v-layout row wrap style="padding: 1em">
          <v-flex xs1>
            <v-avatar >
              <img
                :src="user.profilePic"
                :alt="user.name"
              >
            </v-avatar>
          </v-flex>
          <v-flex xs7 row wrap style="paddingTop: 1.1em">
            <h6> {{user.name}} </h6>
          </v-flex>
          <v-flex xs1 style="marginRight: 1em">
            <v-btn color="error" @click="dialog1 = true">Delete</v-btn>
            <!-- delete dialog -->
            <v-dialog
                v-model="dialog1"
                min-width="350"
                max-width="400"
              >
                <v-card >
                  <v-card-title class="headline">Delete {{user.name}} account?</v-card-title>

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
                      @click="deleteUser(user.id)"
                    >
                      yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <!-- delete dialog end -->
              </v-flex>
              <v-flex xs1 >
                <v-btn color="warning">bann</v-btn>
              </v-flex>
              <v-flex xs1 style="marginLeft: 1em">
                <v-btn color="success" @click="dialog2 = true">add admin</v-btn>
                <!-- add admin dialog -->
                <v-dialog
                    v-model="dialog2"
                    min-width="350"
                    max-width="400"
                  >
                    <v-card >
                      <v-card-title class="headline">Add {{user.name}} as an admin?</v-card-title>

                      <v-card-text>
                        Are you sure ?
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="yellow darken-1"
                          flat="flat"
                          @click="dialog2 = false"
                        >
                          no
                        </v-btn>

                        <v-btn
                          color="green darken-1"
                          flat="flat"
                          @click="addAdmin(user.id)"
                        >
                          yes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                <!-- add admin dialog end -->
          </v-flex>
        </v-layout>
  </div>
</template>

<script>
export default {
props : {
  user :{
    type : Object
  }
},
data() {
  return {
      dialog1: false,
      dialog2: false
  }
},
methods: {
    deleteUser(id){
      this.dialog1 = false
      //alert(id)
      this.$store.dispatch('user/deleteUser',id)
    },
    addAdmin(id){
      this.dialog2 = false
      this.$store.dispatch('user/addAdmin',id)
    }
  },
}
</script>

<style scoped>

</style>

