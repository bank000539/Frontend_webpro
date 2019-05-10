<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>FIRST NAME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model="User.firstname" label="FIRST NAME"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>LAST NAME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model="User.lastname" label="LAST NAME"></v-text-field>
      </v-flex>
    </v-layout>
  <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader >EMAIL</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field type="email" v-model="User.email" label="EMAIL"></v-text-field>
      </v-flex>
    </v-layout>
  <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader  >PASSWORD</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field type="password" v-model="User.password" label="PASSWORD"></v-text-field>
      </v-flex>
    </v-layout>

  <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>CONFIRM PASSWORD</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field type="password" v-model="confirmpass" label="CONFIRM PASSWORD" ></v-text-field>
      </v-flex>
    </v-layout>
<br/><br/>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn v-if="false" color="primary" dark >CLOSE</v-btn>
          <v-btn v-if="true" color="error" dark >CANCEL</v-btn>
          <v-btn v-if="true" color="primary" @click="checkpass" dark >SAVE</v-btn>
        </template>
        
        <v-card>
          <v-card-title class="headline">CONFIRM?</v-card-title>
          
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>FIRST NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="XXXXXXXXXXXXXXXXXXXXX" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>LAST NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="XXXXXXXXXXXXXXXXXXXXX" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>EMAIL</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="XXXXXXXXXXXXXXXXXXXXX" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="dialog = false">BACK</v-btn>
            <v-btn color="success" @click="save">CONFIRM</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["ROOM1", "ROOM2", "ROOM3", "ROOM4"],
    dialog: false,
    confirmpass:"",
    User:{
      firstname:"",
      lastname:"",
      email:"",
      role:"user",
      password:"",
      available: true
    }
  }),
  methods:{
    checkpass(){
      if(this.User.password != this.confirmpass){
        console.log(this.User)
        console.log(this.confirmpass)
        alert("Password and confirm password does not match.");
      }
      else{
        this.dialog = true
      }
    },
    save(){
    }
  }
};
</script>