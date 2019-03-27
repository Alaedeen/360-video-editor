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
        <app-admin :user="user"></app-admin>
      </v-flex>
  </div>
</template>

<script>
import Admin from './Admin.vue'
export default {
  components: {
    appAdmin: Admin
  },
  data() {
    return {
      search: '',
    }
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

}
</script>

<style scoped>

</style>

