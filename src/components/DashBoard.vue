<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="search" append-icon="search" label="Search Date, Room, Time, Subject or Status" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="bookings"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.room }}</td>
        <td>{{ props.item.time }}</td>
        <td>{{ props.item.subject }}</td>
        <td>{{ props.item.status }}</td>
        <td class="text-xs-left">
          <v-btn color="info" v-bind:to="'/booking/view/'+props.item._id">VIEW</v-btn>
          <v-btn color="success" v-bind:to="'/booking/edit/'+props.item._id">EDIT</v-btn>
          <v-btn color="error" >DELETE</v-btn>
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
      search: '',
      headers: [
        {
          text: "DATE",
          align: "left",
          value: "date"
        },
        { text: "ROOM", sortable: true, value: "room" },
        { text: "TIME", sortable: true, value: "time" },
        { text: "SUBJECT", sortable: true, value: "subject" },
        { text: "STATUS", sortable: true, value: "status" },
        { text: "ACTION", sortable: false, value: "" }
      ],
      bookings: [
        {
          _id:"a1sdf",
          date: "01/05/2019",
          room: "ROOM1",
          time: "12:00 - 15:00",
          subject: "CLASSROOM",
          status: "WAITING"
        },
        {
          _id:"a1sdf2",
          date: "02/05/2019",
          room: "ROOM2",
          time: "12:00 - 15:00",
          subject: "CLASSROOM",
          status: "WAITING"
        },
        {
          _id:"a1s3df",
          date: "03/05/2019",
          room: "ROOM3",
          time: "12:00 - 15:00",
          subject: "CLASSROOM",
          status: "WAITING"
        },
        {
          _id:"a1sd4f",
          date: "04/05/2019",
          room: "ROOM4",
          time: "12:00 - 15:00",
          subject: "MEETING",
          status: "WAITING"
        },
        {
          _id:"a1s5df",
          date: "05/05/2019",
          room: "ROOM5",
          time: "12:00 - 15:00",
          subject: "MEETING",
          status: "WAITING"
        }
      ]
    };
  }
};
</script>