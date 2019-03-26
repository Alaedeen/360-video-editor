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
      <v-flex  xs12 style="margin: 2em; box-shadow: -1px 1px 5px grey;padding: 1em" v-for="(user, index) in users" :key="index">
        <app-user :user="user"></app-user>
      </v-flex>
  </div>
</template>

<script>
import User from './User.vue'
export default {
  components: {
    appUser: User
  },
  data() {
    return {
      search: '',
    }
  },
computed: {
  users(){
    var all= this.$store.state.user.users.filter(user => {
      return user.roles.length==1
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

}
</script>

<style scoped>

</style>

