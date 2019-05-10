<template>
  <v-card>
    <v-card-title>
      <v-btn color="primary" :to="'/room/add/0'">ADD</v-btn>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Date, Room, Time, Subject or Status"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="rooms" class="elevation-1" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.roomName }}</td>
        <td>{{ props.item.support.firstname}}</td>
        <td class="text-xs-left">
          <v-btn color="info" :to="'/room/view/'+props.item._id">VIEW</v-btn>
          <v-btn color="success" :to="'/room/edit/'+props.item._id">EDIT</v-btn>
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
        { text: "NAME", sortable: true, value: "name" },
        { text: "SUPPORT", sortable: true, value: "support" },
        { text: "ACTION", sortable: false, value: "" }
      ],
      rooms: []
    };
  },

  methods: {
    async del(id) {
      let result = await axios.post('/room/removeRoom',{_id:id})
      console.log(result)
      if(result.data.code === 500){
            alert(result.data.result)
          }else{
            let result = await axios.post('/room/getRoom',{})
            this.rooms = result.data.result
          }
    }
  },
  async created() {
    let result = await axios.post('/room/getRoom',{})
    console.log(result)
    this.rooms = result.data.result
  }
};
</script>