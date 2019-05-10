<template>
  <div>
    <v-tabs
      v-model="active"
      fixed-tabs
    >
      <v-tab
        v-for="n in 3"
        :key="n"
        ripple
      >
         {{ status[n-1] }}

      </v-tab>
      <v-tab-item
        v-for="n in 3"
        :key="n"
      >
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search Date, Room, Time, Subject or Status"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table  :headers="headers" :items="bookings_[n-1]" class="elevation-1" :search="search">
            <template v-slot:items="props">
              <td>{{ props.item.date }}</td>
              <td>{{ props.item.room.name }}</td>
              <td>{{ props.item.start_time }}</td>
              <td>{{ props.item.end_time }}</td>
              <td style="text-transform: uppercase;">{{ props.item.subject }}</td>
              <td style="text-transform: uppercase;">{{ props.item.status }}</td>
              <td style="text-transform: uppercase;">{{ props.item.checkout }}</td>
              <td class="text-xs-left">
                <v-btn color="info" v-bind:to="'/booking/view/'+props.item._id">VIEW</v-btn>
                <v-btn color="success" v-bind:to="'/booking/edit/'+props.item._id">EDIT</v-btn>
                <v-btn color="error">DELETE</v-btn>
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
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      search: "",
      tabs:null,
      status: ["waiting", "approve", "denied"],
      headers: [
        {
          text: "DATE",
          align: "left",
          value: "date"
        },
        { text: "ROOM", sortable: true, value: "room" },
        { text: "START TIME", sortable: true, value: "start_time" },
        { text: "END TIME", sortable: true, value: "end_time" },
        { text: "SUBJECT", sortable: true, value: "subject" },
        { text: "STATUS", sortable: true, value: "status" },
        { text: "CHECKOUT", sortable: true, value: "checkout" },
        { text: "ACTION", sortable: false, value: "" }
      ],
      bookings: [],
      active: null,
      bookings_: [[],[],[]]
    };
  },
  methods: {
    del(id) {}
  },
  async created() {
    let result = await axios.post('/room/getBooking',{})
    console.log(result.data.result)
    this.bookings = result.data.result.map(el=>{
      let time = new Date(el.start)
      el.room = {name:el.roomName}
      el.date = time.getFullYear()+"-"+(time.getMonth().toString().length !== 1
          ? time.getMonth()
          : "0"+time.getMonth()) +"-"+time.getDate()
      el.start_time = (time.getHours().toString().length!==1?time.getHours():"0"+time.getHours())+":"+(time.getMinutes().toString().length!==1?time.getMinutes():time.getMinutes()+"0")
      time = new Date(el.end)
      el.end_time = (time.getHours().toString().length!==1?time.getHours():"0"+time.getHours())+":"+(time.getMinutes().toString().length!==1?time.getMinutes():time.getMinutes()+"0")
      return el
    })
    console.log(this.bookings)
    this.bookings_=[]
    this.bookings_[0] = this.bookings.filter((item) => {
        return item.status == "waiting" 
      })
      this.bookings_[1] = this.bookings.filter((item) => {
        return item.status == "approve" 
      })
      this.bookings_[2] = this.bookings.filter((item) => {
        return item.status == "denied" 
      })
        console.log(this.bookings_w)
  },
  mounted(){
  }
};
</script>