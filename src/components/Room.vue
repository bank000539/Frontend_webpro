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
        <td>{{ props.item.name }}</td>
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
    del(id) {}
  },
  created() {
    this.rooms = [
      {
        name: "6275",
        equipments: [
          {
            _id: "asasdd",
            name: "Computer",
            description: "",
            amount: 2,
            defaultcheck: true,
            divider: true,
            inset: true
          },
          {
            _id: "asd",
            name: "Lecture Chair",
            description: "",
            amount: 40,
            defaultcheck: true,
            divider: true,
            inset: true
          },
          {
            _id: "asqewd",
            name: "Projecture",
            description: "",
            amount: 1,
            defaultcheck: false,
            divider: true,
            inset: true
          }
        ],
        support:
        {
          _id: "asd3",
          firstname: "Meaw3",
          lastname: "Min2",
          email: "test@mail.com",
          role: "support",
          available: true
        },
        description: "Lecture Room"
      },
      {
        name: "6273",
        equipments: [
          {
            _id: "asasdd",
            name: "Computer",
            description: "",
            amount: 41,
            defaultcheck: true,
            divider: true,
            inset: true
          },
          {
            _id: "asd",
            name: "Lecture Chair",
            description: "",
            amount: 40,
            defaultcheck: true,
            divider: true,
            inset: true
          },
          {
            _id: "asqewd",
            name: "Projecture",
            description: "",
            amount: 1,
            defaultcheck: false,
            divider: true,
            inset: true
          }
        ],
        support:
        {
          _id: "asd3",
          firstname: "Meaw3",
          lastname: "Min2",
          email: "test@mail.com",
          role: "support",
          available: true
        },
        description: "Lab Room"
      },
      {
        name: "6276",
        equipments: [
          {
            _id: "asasdd",
            name: "Computer",
            description: "",
            amount: 2,
            defaultcheck: true,
            divider: true,
            inset: true
          },
          {
            _id: "asd",
            name: "Lecture Chair",
            description: "",
            amount: 40,
            defaultcheck: true,
            divider: true,
            inset: true
          },
          {
            _id: "asqewd",
            name: "Projecture",
            description: "",
            amount: 1,
            defaultcheck: false,
            divider: true,
            inset: true
          }
        ],
        support:
        {
          _id: "asd3",
          firstname: "Meaw3",
          lastname: "Min2",
          email: "test@mail.com",
          role: "support",
          available: true
        },
        description: "Lecture Room"
      }
    ];
  }
};
</script>