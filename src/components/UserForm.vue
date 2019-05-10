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
        <v-subheader>EMAIL</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field type="email" v-model="User.email" label="EMAIL"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>ROLE</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select :items="roles" v-model="User.role" label="ROLE" style="text-transform: uppercase;"></v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>AVAILABLE</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-switch v-model="User.available" :label="User.available.toString()" color="success"></v-switch>
      </v-flex>
    </v-layout>
    <br>
    <br>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn v-if="_readonly==true" color="primary" :to="'/user'"  dark>CLOSE</v-btn>
          <v-btn v-if="_readonly==false" color="error" :to="'/user'"  dark>CANCEL</v-btn>
          <v-btn v-if="_readonly==false" color="primary" dark v-on="on">SAVE</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">CONFIRM?</v-card-title>

          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>FIRST NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="User.firstname" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>LAST NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="User.lastname" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>EMAIL</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="User.email" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>ROLE</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="User.role" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>AVAILABLE</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="User.available" readonly></v-text-field>
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
    roles: ["admin", "support", "user"],
    User: {
      firstname: "",
      lastname: "",
      email: "",
      role: "user",
      password: "",
      available: true
    }
  }),
  methods: {
      save(){
        if(this.$route.params.title == "edit"){
          console.log("Edit",this.$route.params.id)
      console.log(this.User)
        }
        else{
          console.log("Add")
      console.log(this.User)
        }
        this.dialog = false
      },
    setdata() {
      this.User = {
        firstname: "Meaw",
        lastname: "Meaw",
        email: "m@m.co",
        role: "user",
        password: "1234",
        available: true
      };
    }
  },
  created() {
    if (this.$route.params.title == "view") {
      this._readonly = true;
      this.setdata();
    } else if (this.$route.params.title == "add") {
      this._readonly = false;
    } else {
      this._readonly = false;
      this.setdata();
    }
  }
};
</script>
<style>
.v-list {
  text-transform: uppercase;
}
</style>
