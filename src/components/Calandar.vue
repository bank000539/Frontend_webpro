<template>
  <v-layout row wrap>
    <v-flex xs12 sm5 offset-sm1 class="my-2 px-1">
      <v-date-picker v-model="date" full-width></v-date-picker>
    </v-flex>
    <v-flex xs12 sm4 offset-sm1 class="my-2 px-1">
      <div class="title">Booking on {{ date || 'change day...' }}</div>
      <v-select :items="items" v-model="roomFilter" item-value="value" label="Select Room"></v-select>
      <ul class="ma-3">
        <li
          v-for="review in filter"
          v-if="review.type === 'recordReview'"
        >{{review.room}} / {{review.postDate.time}} - {{review.title}}</li>
      </ul>
    </v-flex>
    <v-flex class="button text-xs-center">
      <v-btn color="success" v-bind:to="'/booking/add/0'">BOOKING</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    roomFilter: "All",
    items: [
      { text: "All", value: "All" }
    ],
    bookings: []
  }),
  computed: {
    filter
  },
  async created() {
    let result = await axios.post('/room/getRoom',{})
    console.log(result)
    this.rooms = result.data.result.map(el=>{
      this.items.push({ text: el.roomName, value: el.roomName })
    })
    let result2 = await axios.post("/room/getBooking", {});
    console.log(result2.data.result);
    this.bookings = result2.data.result.map(el => {
      let time = new Date(el.start);
      el.room = { name: el.roomName };
      el.date =
        time.getFullYear() + "-" + (time.getMonth().toString().length !== 1
          ? time.getMonth()
          : "0"+time.getMonth()) + "-" + time.getDate();
      el.start_time =
        (time.getHours().toString().length !== 1
          ? time.getHours()
          : "0" + time.getHours()) +
        ":" +
        (time.getMinutes().toString().length !== 1
          ? time.getMinutes()
          : time.getMinutes() + "0");
      time = new Date(el.end);
      el.end_time =
        (time.getHours().toString().length !== 1
          ? time.getHours()
          : "0" + time.getHours()) +
        ":" +
        (time.getMinutes().toString().length !== 1
          ? time.getMinutes()
          : time.getMinutes() + "0");
      let newel = {
        title: el.subject,
        type: "recordReview",
        postDate: {
          date: el.date,

          time: `${el.start_time} - ${el.end_time}`
        },
        room: el.roomName
      };
      return newel;
    });
  }
};
function filter() {
  console.log(this.date);
  const roomFilter = entry =>
    this.roomFilter == "All" ||
    (this.roomFilter == "Neither" && !entry.room) ||
    entry.room === this.roomFilter;

  const date = entry => this.date == "Year" || entry.postDate.date == this.date;

  const reducer = (accumulator, entry) => {
    if (roomFilter(entry) && date(entry)) accumulator.push(entry);
    return accumulator;
  };
  return this.bookings.reduce(reducer, []);
}
</script>

<style>
.button {
  margin-top: 30px;
}
</style>
