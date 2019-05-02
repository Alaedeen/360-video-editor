<template>
<div >
    <v-dialog v-model="dialog" dark fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">

          <v-hover>

      <v-avatar
            size= '65'
            color="grey lighten-4"
                slot-scope="{ hover }"
                style="cursor: pointer"
               v-on="on"
          >

            <v-img :src="user.profilePic" alt="avatar">
              <v-expand-transition  >
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
        </template>
        <v-card>
          <v-toolbar dark color="blue">
            <v-btn icon dark @click="cancel">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="save">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!-- update picture -->
          <v-dialog
        v-model="dialog1"
        width="500"

      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="red "
            dark
            v-on="on"
            style="marginLeft: 2em;  marginTop: 2em;"
          >
            Update profile picture
          </v-btn>
        </template>

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Select picture
          </v-card-title>

          <!-- choose picture -->
            <v-content style="padding: 0px">
              <v-container fluid>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <img :src="imageUrl" height="150" v-if="imageUrl"/>
                  <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                </v-flex>
                <v-dialog v-model="dialog2" max-width="290">

                </v-dialog>
              </v-container>
            </v-content>
          <!-- choose picture end -->

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="cancelPictureUpdate()"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              flat
              @click="dialog1 = false"
            >
              Done
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
          <!-- update picture end -->
          <v-text-field
          label="Name"
           outline
          v-model="name"
          style="paddingLeft: 2em; paddingRight: 2em; paddingTop: 2em;"></v-text-field>
          <v-text-field
          label="E-mail"
           outline
          v-model="email"
          style="paddingLeft: 2em; paddingRight: 2em; paddingTop: 1em;"></v-text-field>
          <v-text-field
          label="Password"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min, rules.valide]"
          :type="show ? 'text' : 'password'"
           outline
          v-model="password"
           @click:append="show = !show"
          style="paddingLeft: 2em; paddingRight: 2em; paddingTop: 1em;"></v-text-field>
          <v-textarea
            outline
            name="input-7-4"
            label="Description"
            v-model="description"
            style="paddingLeft: 2em; paddingRight: 2em; paddingTop: 1em;"></v-textarea>
            <v-layout wrap
            style="paddingLeft: 3em; paddingRight: 3em;">
            <v-flex xs4 md4
            >
                  <v-autocomplete
                    :items="months"
                    label="Month of birth"
                    v-model="month"
                  ></v-autocomplete>
            </v-flex>
            <v-flex xs4 md4
            style="paddingLeft: 3em;">
                  <v-select
                    :items="days"
                    label="Day of birth"
                    v-model="day"
                  ></v-select>
            </v-flex>
            <v-flex xs4 md4
            style="paddingLeft: 3em;">
                  <v-select
                    :items="years"
                    label="Year of birth"
                    v-model="year"
                  ></v-select>
            </v-flex>
            </v-layout>
            <v-autocomplete
                    :items="countries"
                    label="country of residence"
                    v-model="country"
                    style="paddingLeft: 3em; paddingRight: 3em;"
                  ></v-autocomplete>
        </v-card>
      </v-dialog>
      <!-- mail or name already used -->
      <v-snackbar
          v-model="snackbar"
          color="red"
          top
          :timeout = "timeout"
        >
          Mail or user name already used
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <!-- mail or name already used end-->
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      dialog2: false,
		  imageName: '',
		  imageUrl: this.user.profilePic,
		  imageFile: '',
      dialog: false,
      dialog1: false,
      password :this.user.password,
      name: this.user.name,
      email: this.user.email,
      description: this.user.description,
      month: this.user.dateOfBirth.month,
      day: this.user.dateOfBirth.day,
      year: this.user.dateOfBirth.year,
      country: this.user.countryOfResidence,
      changePassword: false,
      valid: false,
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      countries: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        valide: () => this.valid || `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , .  & ? etc)`,
      },
      timeout : 6000
    }
  },
  computed:  {
    days() {
      switch(this.month){
        case 'January': case 'March': case 'May': case 'Jully': case 'August': case 'October': case 'December': var i=31
          break
        case 'February' : var i=29
          break
        case 'April': case 'June': case 'September': case 'November' : var i= 30
          break
        default: var i=0
      }
      var daysTab = []
      for (let index = 1; index <= i; index++) {
        daysTab.push(index)
      }
      return daysTab
    },
    years(){
      var yearsTab = []
      var today = new Date();
      var year = today.getFullYear();
      for (let index = year ; index >= 1900; index--) {
        yearsTab.push(index)
      }
      return yearsTab
    },
    snackbar(){
      return this.$store.state.user.signupError
    },
  },
  props : {
    user : {
      type: Object,
    },
    action: {
      type: String
    }
  },
  mounted() {
    this.valid = this.validate()
  },
  methods: {
        pickFile () {
            this.$refs.image.click ()
        },
 validate(pass = this.password){
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(pass);
    },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
      }
      // console.log(this.imageFile);
      // console.log(this.imageName);
      // console.log(this.imageUrl);

    },
    cancel(){
        this.dialog = false
        this.imageUrl= this.user.profilePic
        this.password =this.user.password
        this.name= this.user.name
        this.email= this.user.email
        this.description= this.user.description
        this.month= this.user.dateOfBirth.month
        this.day= this.user.dateOfBirth.day
        this.year= this.user.dateOfBirth.year
        this.country= this.user.countryOfResidence
    },
    save(){

        var updatedUser = {
          id: this.user.id,
          name: this.name,
          email: this.email,
          password: this.password,
          roles: this.user.roles,
            dateOfBirth: {
              day: this.day,
              month: this.month,
              year: this.year
            },
            countryOfResidence: this.country,
            description: this.description,
            profilePic: this.imageUrl,
            joined: this.user.joined,
            subscribers : this.user.subscribers,
            subscriptions: this.user.subscriptions,
            videosLikes: this.user.videosLikes,
            videosDislikes: this.user.videosDislikes,
            commentsLikes: this.user.commentsLikes,
            commentsDislikes: this.user.commentsDislikes,
            repliesLikes: this.user.repliesLikes,
            repliesDislikes: this.user.repliesDislikes,
        }
        var update ={
          updatedUser: updatedUser,
          action: this.action
        }
        this.$store.dispatch('user/updateUser',update)
        if (!this.snackbar) {
          this.dialog = false
        }

        if (this.action=='user') {
          this.$cookies.set('user', updatedUser, -1);
        }



    },
    cancelPictureUpdate(){
      this.dialog1 = false
      this.imageUrl= this.user.profilePic
    }
    },
    watch: {
      password(val){
        this.valid = this.validate(val)
      }
    },
}
</script>

<style scoped>

</style>

