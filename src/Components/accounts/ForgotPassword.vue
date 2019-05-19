<template>
  <div>
    <v-container grid-list-md text-xs-center >
      <v-layout row wrap align-center justify-center fill-height>
        <v-flex  xs6>
          <v-card  color="#f3f3f3">
            <v-img src="/src/assets/il-password-reset@2x.png"></v-img>
            <span style="text-transform: uppercase; " class="text1">Forgot</span><br>
            <span style="text-transform: uppercase; " class="text2">your password?</span><br><br>
            <span class="text3">Not to worry, we got you! Let’s get you a new password.</span>

            <v-layout row wrap align-center justify-center fill-height v-if="reset==0">
              <v-flex xs8 style="margin-top:2em" >
                <v-text-field
                  label="email"
                  placeholder="Enter your email here!"
                  outline
                  color="red"
                  v-model="email"
                ></v-text-field>
              </v-flex>
              <v-flex xs8 style="margin-top: -1em" >
                <v-btn dark color="red" large round @click="resetPass">RESET PASSWORD</v-btn>
              </v-flex>
            </v-layout>

            <v-layout row wrap align-center justify-center fill-height v-if="reset==1">
              <v-flex xs8 style="margin-top:2em" >
                <h5 style="color: red;">The mail you provided does not exist!</h5>
                <v-btn dark color="red" @click="tryAgain" round>Try again!</v-btn>
                <h5 style="color: black;cursor:pointer" @click="createAccount">Create an acount!</h5>
              </v-flex>
            </v-layout>

            <v-layout row wrap align-center justify-center fill-height v-if="reset==2">
              <v-flex xs8 style="margin-top:2em" >
                <h5 style="color: black;">Your password has changed! check your email for the new password.</h5>
                <h5 style="color: #0EBFE9;cursor:pointer" @click="SignIn">Sign In!</h5>
              </v-flex>
            </v-layout>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Loader -->
       <v-dialog
          v-model="dialog"
          hide-overlay
          persistent
          width="300"
        >
          <v-card
            color="blue"
            dark
          >
            <v-card-text>
              Loading...
              <v-progress-linear
                indeterminate
                color="black"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reset : 0,
      email: ''
    }
  },
  computed: {
    dialog(){
      return this.$store.state.user.userLoading
    },
  },
  methods: {
    resetPass(){
      this.$store.dispatch('user/resetPassword', this.email).then((data)=>{
        if (data==404) {
          this.reset=1
        }else{
          this.reset=2
        }
      })

    },
    tryAgain(){
      this.reset=0
    },
    createAccount(){
      this.$router.push({path:'/sign_up'})
    },
    SignIn(){
      this.$router.push({path:'/login'})
    }
  },
}
</script>

<style scoped>
.text1 {
  color: #2a2a2a;
  font-family: "Asap", Helvetica, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: bold;
  line-height: 125%;
  letter-spacing: 2px;
}
.text2{
      color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: bold;
    line-height: 125%;
    letter-spacing: 1px;
}
.text3{
  word-break: break-word;
  color: #2a2a2a;
  font-family: "Asap", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
  padding-top: 9px;
  padding-right: 18px;
  padding-bottom: 9px;
  padding-left: 18px;
}
</style>

