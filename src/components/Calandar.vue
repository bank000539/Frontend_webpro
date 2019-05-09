<template>
  <v-layout row wrap>
    <v-flex xs12 sm5 offset-sm1 class="my-2 px-1">
      <v-date-picker v-model="date" full-width></v-date-picker>
    </v-flex>
    <v-flex xs12 sm4 offset-sm1 class="my-2 px-1">
      <div class="title">Booking on {{ date || 'change day...' }}</div>
      <v-select :items="items" v-model="roomFilter" item-value="value" label="Select Room"></v-select>
      <ul class="ma-3">
        <li v-for="review in filter" v-if="review.type === 'recordReview'">{{review.room}} / {{review.postDate.time}} - {{review.title}}</li>
      </ul>
    </v-flex>
    <v-flex class="button text-xs-center">
        <v-btn color="success" v-bind:to="'/booking'">BOOKING</v-btn>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    pressEntries,
    roomFilter: 'All',
    items: [
      { text: 'All', value: 'All' },
      { text: 'Room 1', value: 'Room 1' },
      { text: 'Room 2', value: 'Room 2'},
      { text: 'Room 3', value: 'Room 3'}
    ],
  }),
  computed:{
    filter
  }
};
const pressEntries = [
  {
    title: "This is spinal tap",
    type:"recordReview",
    postDate: {
      date: "2019-05-10",
      time: "00:09 - 12:00"
    },
    room: "Room 1"
  },
  {
    title: "Purple Rain",
    type:"recordReview",
    postDate: {
      date: "2019-05-11",
      time: "00:09 - 12:00"
    },
    room: "Room 2"
  },
  {
    title: "Enter Sandman",
    type:"recordReview",
    postDate: {
      date: "2019-05-12",
      time: "00:09 - 12:00"
    },
    room: "Room 3"
  },
    {
    title: "No related",
    type:"recordReview",
    postDate: {
      date: "2019-05-12",
      time: "00:09 - 12:00"
    },
    room: "Room 1"
  },
  
]

function filter(){
  console.log(this.date)
  const roomFilter = entry => 
           (this.roomFilter == 'All') || 
           (this.roomFilter == 'Neither' && !entry.room) ||
           (entry.room === this.roomFilter);
  
  const date = entry => 
         (this.date == 'Year') || 
         (entry.postDate.date == this.date);
  
  const reducer = (accumulator, entry) => {
    if (roomFilter(entry) && date(entry))
      accumulator.push(entry);
    return accumulator;
  }
  return this.pressEntries.reduce(reducer, []);
}
</script>

<style>
.button{
  margin-top: 30px;
}
</style>
