<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search First Name, Last Name, Email, Role, Status"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" class="elevation-1" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.firstName }}</td>
        <td>{{ props.item.lastName }}</td>
        <td>{{ props.item.username }}</td>
        <td style="text-transform: uppercase;">{{ props.item.role }}</td>
        <td style="text-transform: uppercase;">{{ props.item.available }}</td>
        <td class="text-xs-left">
          <v-btn color="info" :to="'/user/view/'+props.item._id">VIEW</v-btn>
          <v-btn color="success" :to="'/user/edit/'+props.item._id">EDIT</v-btn>
          <v-btn color="error" @click="confirm(props.item.username)">DELETE</v-btn>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template>
        </template>
        <v-card>
          <v-card-title class="headline">CONFIRM DELETE?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">BACK</v-btn>
            <v-btn color="error" @click="del(del_id)">CONFIRM</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      search: "",
      del_id: "",
      dialog: false,
      headers: [
        { text: "FIRST NAME", sortable: true, value: "firstname" },
        { text: "LAST NAME", sortable: true, value: "lastname" },
        { text: "EMAIL", sortable: true, value: "username" },
        { text: "ROLE", sortable: true, value: "role" },
        { text: "AVAILABLE", sortable: true, value: "available" },
        { text: "ACTION", sortable: false, value: "" }
      ],
      users: []
    };
  },
  methods: {
    confirm(id){
      this.dialog = true
      this.del_id = id
    },
    async del(id) {
      let result = await axios.post('/auth/removeUser',{username:id})
      console.log(result)
      if(result.data.code === 500){
            alert(result.data.result)
          }else{
            let data = await axios.post('/auth/getUser',{})
            console.log(data)
      this.dialog = false
            this.del_id = ""
            this.users = data.data.result
          }
    }
  },
  async created() {
    let data = await axios.post('/auth/getUser',{})
    console.log(data)
    this.users = data.data.result
  }
};
</script>