<template>
<div style="text-align: center">
  <div style="width: 50%"></div>
  <div id="logreg-forms">
        <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in</h1>
            <div class="social-login">
                <button class="btn facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f"></i> <b>Sign in with Facebook</b></span> </button>
                <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> <b>Sign in with Google+</b></span> </button>
            </div>
            <p style="text-align:center"> OR  </p>
            <!-- validate email -->
            <ValidationProvider name="email"
            rules="required|email"
            >
              <div slot-scope="{ errors }">
                <input v-model="user.email"
            placeholder="Email address"
            id="inputEmail"
                class="form-control"
                :class="{'error' : errors.length!=0}"
                @keyup="error= errors.length!=0">
                <b style="color : red">{{ errors[0] }}</b>
              </div>
            </ValidationProvider>
            <!-- validate email -->
                <br>
                <!-- validate password -->
                <ValidationProvider name="password"
                  rules="required|min:8|verify_password"
                  >
                    <div slot-scope="{ errors }">
                      <div class="password">
                          <input :type="passwordVisible ? 'text' : 'password'"
                            id="inputPassword"
                            class="form-control"
                            placeholder="Password"
                            required=""
                            v-model="user.password"
                            :class="{'error' : errors.length!=0}"
                            @keyup="error= errors.length!=0">
                            <button class="visibility"
                            tabindex='-1'
                            @click.prevent='passwordVisible = !passwordVisible'
                            :arial-label='passwordVisible ? "Hide password" : "Show password"'>
                              <i class="material-icons">{{ passwordVisible ? "visibility" : "visibility_off" }}</i>
                            </button>

                      </div>
                      <b style="color : red">{{ errors[0] }}</b>
                    </div>
                  </ValidationProvider>
                  <!-- validate password -->
                  <br>
              <b style="color: red" v-if="form!=''"> {{form}} </b>
            <button class="btn btn-success btn-block" @click.prevent="checkLogin()"><i class="fas fa-sign-in-alt"></i> Sign in</button>
            <a href="#" id="forgot_pswd">Forgot password?</a>
            <hr>
            <!-- <p>Don't have an account!</p>  -->
            <router-link to="/sign_up" class="btn btn-primary " style="color: white;" type="button" id="btn-signup"> Sign up New Account</router-link>
            </form>
            <br>

    </div>
    <v-snackbar
        v-model="snackbar"
        top
        color="red"
        :timeout = "timeout"
      >
        Incorrect email or password.
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
</div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      user: {
              email: '',
              password: ''
            },
        passwordVisible:false,
        error: false,
        form : '',
        timeout : 6000
    }
  },
  computed: {
    current(){
        return this.$store.state.user.current
    },
    snackbar(){
      return this.$store.state.user.loginError
    }

  },
  methods: {
    checkLogin(){
      if (this.user.email==='' || this.user.password==='' ) {
          this.form='You must fill all fields'
      }else if (!this.error) {
         this.$store.dispatch('user/signIn', this.user);
         if (this.current!= null) {
            this.$router.push({path:'/'})
         }
      }
    }
  },

}
</script>

<style scoped>
.visibility {
	all:unset;
	background:whitesmoke;
	display:inline-block;
	padding:2px .4em 0;
	vertical-align:center;
}
.material-icons {
	font-size: 1.5em;
}
.password {
	display:flex;
	align-items:center;
}
.error{
  border-color: red;
}

/* sign in FORM */
#logreg-forms{

    width:412px;
    margin:10vh auto;
    background-color:#f3f3f3;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
#logreg-forms form {
    width: 100%;
    max-width: 410px;
    padding: 15px;
    margin: auto;
}
#logreg-forms .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
#logreg-forms .form-control:focus { z-index: 2; }
#logreg-forms .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
#logreg-forms .form-signin input[type="password"] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

#logreg-forms .social-login{
    width:390px;
    margin:0 auto;
    margin-bottom: 14px;
}
#logreg-forms .social-btn{
    font-weight: 100;
    color:white;
    width:190px;
    font-size: 0.9rem;
}

#logreg-forms a{
    display: block;
    padding-top:10px;
    color:lightseagreen;
}

#logreg-form .lines{
    width:200px;
    border:1px solid red;
}


#logreg-forms button[type="submit"]{ margin-top:10px; }

#logreg-forms .facebook-btn{  background-color:#3C589C; }

#logreg-forms .google-btn{ background-color: #DF4B3B; }

#logreg-forms .form-reset, #logreg-forms .form-signup{ display: none; }

#logreg-forms .form-signup .social-btn{ width:210px; }

#logreg-forms .form-signup input { margin-bottom: 2px;}

.form-signup .social-login{
    width:210px !important;
    margin: 0 auto;
}

/* Mobile */

@media screen and (max-width:500px){
    #logreg-forms{
        width:300px;
    }

    #logreg-forms  .social-login{
        width:200px;
        margin:0 auto;
        margin-bottom: 10px;
    }
    #logreg-forms  .social-btn{
        font-size: 1.3rem;
        font-weight: 100;
        color:white;
        width:200px;
        height: 56px;

    }
    #logreg-forms .social-btn:nth-child(1){
        margin-bottom: 5px;
    }
    #logreg-forms .social-btn span{
        display: none;
    }
    #logreg-forms  .facebook-btn:after{
        content:'Facebook';
    }

    #logreg-forms  .google-btn:after{
        content:'Google+';
    }

}
</style>


