<template>
  <v-data-table
    :headers="headers"
    :items="bookings"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.date }}</td>
      <td>{{ props.item.room }}</td>
      <td>{{ props.item.time }}</td>
      <td>{{ props.item.subject }}</td>
      <td>{{ props.item.status }}</td>
      <td class="text-xs-right"><v-btn color="success" v-bind:to="'/dashboard/edit'">EDIT</v-btn></td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'DATE',
            align: 'left',
            value: 'date'
          },
          { text: 'ROOM', sortable: false, value: 'room' },
          { text: 'TIME', sortable: false, value: 'time' },
          { text: 'SUBJECT', sortable: false, value: 'subject' },
          { text: 'STATUS', sortable: false,  value: 'status' },
          { text: '', sortable: false,  value: '' },
        ],
        bookings: [
          {
            date: '01/05/2019',
            room: 'ROOM1',
            time: '12:00 - 15:00',
            subject: 'CLASSROOM',
            status: 'WAITING',
          },
          {
            date: '02/05/2019',
            room: 'ROOM2',
            time: '12:00 - 15:00',
            subject: 'CLASSROOM',
            status: 'WAITING',
          },
          {
            date: '03/05/2019',
            room: 'ROOM3',
            time: '12:00 - 15:00',
            subject: 'CLASSROOM',
            status: 'WAITING',
          },
          {
            date: '04/05/2019',
            room: 'ROOM4',
            time: '12:00 - 15:00',
            subject: 'MEETING',
            status: 'WAITING',
          },
          {
            date: '05/05/2019',
            room: 'ROOM5',
            time: '12:00 - 15:00',
            subject: 'MEETING',
            status: 'WAITING',
          },
        ]
      }
    }
  }
</script>