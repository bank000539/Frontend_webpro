<template>
  <v-card>
    <v-card-title>
      <v-btn color="primary" :to="'/equipment/add/0'">ADD</v-btn>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Equipment Name"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="equipments" class="elevation-1" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.equipmentName }}</td>
        <td class="text-xs-left">
          <v-btn color="info" :to="'/equipment/view/'+props.item._id">VIEW</v-btn>
          <v-btn color="success" :to="'/equipment/edit/'+props.item._id">EDIT</v-btn>
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
        { text: "EQUIPMENT", sortable: true, value: "name" },
        { text: "ACTION", sortable: false, value: "" }
      ],
      equipments: []
    };
  },
  methods: {
    async del(id) {
      let result = await axios.post('/equipment/removeEquipment',{_id:id})
      console.log(result)
      if(result.data.code === 500){
            alert(result.data.result)
          }else{
            let data = await axios.post('/equipment/getEquipment',{})
            console.log(data)
            this.equipments = data.data.result
          }
    }
  },
  async created() {
    let data = await axios.post('/equipment/getEquipment',{})
    console.log(data)
    this.equipments = data.data.result
  }
};
</script>