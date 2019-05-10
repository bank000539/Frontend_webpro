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
              <td>{{ props.item.time }}</td>
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
        { text: "TIME", sortable: true, value: "time" },
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
  created() {
    this.bookings= [
        {
          _id: "asdf1",
          date: "01/05/2019",
          time: "12:30:00",
          subject: "Test",
          status: "waiting",
          checkout: false,
          room: {
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
            support: {
              _id: "asd3",
              firstname: "Meaw3",
              lastname: "Min2",
              email: "test@mail.com",
              role: "support",
              available: true
            },
            description: "Lecture Room"
          },
          description: "Test naja",
          equipments: [
            {
              _id: "asqewd",
              name: "Projecture",
              description: "",
              amount: 2,
              defaultcheck: true,
              divider: true,
              inset: true
            },
            {
              _id: "asasdd",
              name: "Computer",
              description: "",
              amount: 1,
              defaultcheck: true,
              divider: true,
              inset: true
            }
          ]
        },
        {
          _id: "a1sdf2",
          date: "02/05/2019",
          time: "12:30:00",
          subject: "Test",
          status: "waiting",
          checkout: false,
          room: {
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
            support: {
              _id: "asd3",
              firstname: "Meaw3",
              lastname: "Min2",
              email: "test@mail.com",
              role: "support",
              available: true
            },
            description: "Lecture Room"
          },
          description: "Test naja",
          equipments: [
            {
              _id: "asqewd",
              name: "Projecture",
              description: "",
              amount: 2,
              defaultcheck: true,
              divider: true,
              inset: true
            },
            {
              _id: "asasdd",
              name: "Computer",
              description: "",
              amount: 1,
              defaultcheck: true,
              divider: true,
              inset: true
            }
          ]
        },
        {
          _id: "a1s3df",
          date: "03/05/2019",
          time: "12:30:00",
          subject: "Test",
          status: "waiting",
          checkout: false,
          room: {
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
            support: {
              _id: "asd3",
              firstname: "Meaw3",
              lastname: "Min2",
              email: "test@mail.com",
              role: "support",
              available: true
            },
            description: "Lecture Room"
          },
          description: "Test naja",
          equipments: [
            {
              _id: "asqewd",
              name: "Projecture",
              description: "",
              amount: 2,
              defaultcheck: true,
              divider: true,
              inset: true
            },
            {
              _id: "asasdd",
              name: "Computer",
              description: "",
              amount: 1,
              defaultcheck: true,
              divider: true,
              inset: true
            }
          ]
        },
        {
          _id: "a1sd4f",
          date: "04/05/2019",
          time: "12:30:00",
          subject: "Test",
          status: "denied",
          checkout: false,
          room: {
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
            support: {
              _id: "asd3",
              firstname: "Meaw3",
              lastname: "Min2",
              email: "test@mail.com",
              role: "support",
              available: true
            },
            description: "Lecture Room"
          },
          description: "Test naja",
          equipments: [
            {
              _id: "asqewd",
              name: "Projecture",
              description: "",
              amount: 2,
              defaultcheck: true,
              divider: true,
              inset: true
            },
            {
              _id: "asasdd",
              name: "Computer",
              description: "",
              amount: 1,
              defaultcheck: true,
              divider: true,
              inset: true
            }
          ]
        },
        {
          _id: "a1s5df",
          date: "05/05/2019",
          time: "12:30:00",
          subject: "Test",
          status: "approve",
          checkout: false,
          room: {
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
            support: {
              _id: "asd3",
              firstname: "Meaw3",
              lastname: "Min2",
              email: "test@mail.com",
              role: "support",
              available: true
            },
            description: "Lecture Room"
          },
          description: "Test naja",
          equipments: [
            {
              _id: "asqewd",
              name: "Projecture",
              description: "",
              amount: 2,
              defaultcheck: true,
              divider: true,
              inset: true
            },
            {
              _id: "asasdd",
              name: "Computer",
              description: "",
              amount: 1,
              defaultcheck: true,
              divider: true,
              inset: true
            }
          ]
        }
      ]
  
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