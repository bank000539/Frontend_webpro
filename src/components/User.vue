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
        <td>{{ props.item.firstname }}</td>
        <td>{{ props.item.lastname }}</td>
        <td>{{ props.item.username }}</td>
        <td style="text-transform: uppercase;">{{ props.item.role }}</td>
        <td style="text-transform: uppercase;">{{ props.item.available }}</td>
        <td class="text-xs-left">
          <v-btn color="info" :to="'/user/view/'+props.item._id">VIEW</v-btn>
          <v-btn color="success" :to="'/user/edit/'+props.item._id">EDIT</v-btn>
          <v-btn color="error" @click="del(props.item._id)">DELETE</v-btn>
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
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      search: "",
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
    async del(id) {
      let result = await axios.post('/auth/removeUser',{_id:id})
      console.log(result)
      if(result.data.code === 500){
            alert(result.data.result)
          }else{
            let data = await axios.post('/auth/getUser',{})
            console.log(data)
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