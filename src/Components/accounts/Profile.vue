<template>
<div class="profile" >
  <v-app id="inspire" >
    <v-parallax
      dark
     height="300" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thin mb-3"> {{current.name}} </h1>
        <h4 class="subheading">{{current.description}}</h4>
      </v-layout>
    </v-parallax>
  </v-app>

  <v-flex
          xs12
          sm6
          md8
          align-center
          justify-left
          layout
          text-xs-center
          class= "avatar"
        >
           <v-hover>

      <v-avatar
            size= '65'
            color="grey lighten-4"
                slot-scope="{ hover }"
                style="cursor: pointer"
          >

            <v-img :src="current.profilePic" alt="avatar">
              <v-expand-transition >
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;opacity: 0.5;"
            >
              <v-icon dark>edit</v-icon>
            </div>
          </v-expand-transition>
        </v-img>
          </v-avatar>

            </v-hover>

        <h2 class = 'name'> {{current.name}} </h2>
        </v-flex>

        <v-app class="tabs">
          <div>
            <v-tabs
              v-model="active"
              dark
              slider-color="red"
            >
              <v-tab
                v-for="tab in tabs"
                :key="tab"
                ripple
              >
                 {{ tab }}

              </v-tab>
              <v-tab-item
                v-for="tab in tabs"
                :key="tab"
              >
                <v-card flat  class="profile">
                  <v-card-text v-if="tab=='Online videos'"> Online videos</v-card-text>
                  <v-card-text v-if="tab=='About'"> About</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>


          </div>
        </v-app>

</div>
</template>

<script>
export default {
  data() {
    return {
      tabs :['Online videos', 'About' ]
    }
  },
computed: {
      current() {
        return this.$store.state.user.current
      }
    },
    beforeCreate() {
        if (this.$store.state.user.current==null) {
          this.$router.push({ path: '/' })
        }
    },
}

</script>

<style scoped>
#inspire {
  height : 300px
}
.avatar{
  padding-left: 2em;
  padding-top: 2em;
}
.name{
  padding-left: 1em;
  color : white
}
.tabs{
  padding-top: 2em;
  background-color: 	#444444
}
.profile{
      background-color: 	#444444;
      color : white
}
</style>

