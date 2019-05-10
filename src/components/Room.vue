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
          <v-btn color="error" @click="confirm(props.item._id)">DELETE</v-btn>
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
        <template></template>
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
        { text: "NAME", sortable: true, value: "name" },
        { text: "SUPPORT", sortable: true, value: "support" },
        { text: "ACTION", sortable: false, value: "" }
      ],
      rooms: []
    };
  },

  methods: {
    confirm(id) {
      this.dialog = true;
      this.del_id = id;
    },
    async del(id) {
      let result = await axios.post('/room/removeRoom',{_id:id})
      console.log(result)
      if(result.data.code === 500){
            alert(result.data.result)
          }else{
            let result = await axios.post('/room/getRoom',{})
            this.rooms = result.data.result

        this.dialog = false;
        this.del_id = "";
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