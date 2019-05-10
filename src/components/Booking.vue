<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>First Name</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="Firstname" v-model="Book.user.firstname" :readonly="_readonly"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>Last Name</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="Lastname" v-model="Book.user.lastname" :readonly="_readonly"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>DATE</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          :readonly="_readonly"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="Book.date" :readonly="_readonly" label="Date" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="Book.date" :readonly="_readonly" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(Book.date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>START TIME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="Time" v-model="Book.start_time" :readonly="_readonly" type="time"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>END TIME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="Time" v-model="Book.end_time" :readonly="_readonly" type="time"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>ROOM</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          :items="rooms"
          v-model="Book.room"
          :readonly="_readonly"
          item-text="name"
          item-value="name"
          return-object
          @change="updateequip()"
          label="ROOM"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>EQUIPMENTS</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-combobox
          v-model="Book.equipments"
          :items="equipments"
          label="EQUIPMENTS"
          item-text="name"
          multiple
          chips
          @change="updatefield()"
          :readonly="_readonly"
        ></v-combobox>
        <v-list one-line style="background-color: transparent;">
          <template v-for="(item, index) in Book.equipments">
            <v-list-tile :key="item._id" justify-center>
              {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-text-field label="Amount" :readonly="_readonly" :value="item.amount" type="number"></v-text-field>
              <!-- <v-switch
                v-model="item.defaultcheck"
                :readonly="_readonly"
                :label="`Default Check: ${item.defaultcheck}`"
              ></v-switch>-->
            </v-list-tile>
            <v-divider :key="index" :inset="item.inset"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>SUBJECT</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model="Book.subject" :readonly="_readonly" label="SUBJECT"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>STATUS</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          :items="status"
          :readonly="_readonly"
          v-model="Book.status"
          label="STATUS"
          style="text-transform: uppercase;"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>CHECKOUT</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-switch
          v-model="Book.checkout"
          :readonly="_readonly"
          :label="Book.checkout?'PASS':'NOT PASS'"
          color="success"
        ></v-switch>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>DESCRIPTION</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-textarea
          name="input-7-1"
          :readonly="_readonly"
          v-model="Book.description"
          label="Description"
        ></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn v-if="_readonly==true" color="primary" dark :to="'/dashboard'">CLOSE</v-btn>
          <v-btn v-if="_readonly==false" color="error" dark :to="'/dashboard'">CANCEL</v-btn>
          <v-btn v-if="_readonly==false" color="primary" dark v-on="on">SAVE</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">CONFIRM?</v-card-title>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>DATE</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Book.date" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>START TIME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Book.start_time" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>END TIME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Book.end_time" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>ROOM</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Book.room.name" readonly></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>EQUIPMENTS</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-combobox
                v-model="Book.equipments"
                :items="Book.equipments"
                label="EQUIPMENTS"
                item-text="name"
                multiple
                chips
                readonly
              ></v-combobox>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>SUBJECT</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Book.subject" readonly></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>STATUS</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Book.status" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>CHECKOUT</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field readonly>{{Book.checkout?'PASS':'NOT PASS'}}</v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>DESCRIPTION</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-textarea v-model="Book.description" readonly></v-textarea>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="dialog = false">BACK</v-btn>
            <v-btn color="success" @click="save">CONFIRM</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    rooms: [],
    equipments: [],
    status: ["waiting", "approve", "denied"],
    checkout: ["pass", "not pass"],
    dialog: false,
    _readonly: false,
    Book: {
      date: new Date().toISOString().substr(0, 10),
      user: {
        firstname: "",
        lastname: ""
      },
      start_time: "00:00:00",
      end_time: "00:00:00",
      room: {
        equipments: []
      },
      status: "",
      checkout: false,
      equipments: [],
      subject: "",
      description: ""
    }
  }),
  created() {
    this.getdata();
    if (this.$route.params.title == "view") {
      this._readonly = true;
      this.setdata();
    } else if (this.$route.params.title == "add") {
      this._readonly = false;
    } else {
      this._readonly = false;
      this.setdata();
    }
  },
  methods: {
    save() {
      if (this.$route.params.title == "edit") {
        console.log("Edit", this.$route.params.id, this.Room);
      } else {
        console.log("Add", this.Book);
      }
      this.dialog = false;
    },
    getdata() {
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
          support: {
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
          support: {
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

      this.equipments = [
        {
          _id: "asd",
          name: "Lecture Chair",
          description: ""
        },
        {
          _id: "asasdd",
          name: "Computer",
          description: ""
        },
        {
          _id: "asqewd",
          name: "Projecture",
          description: ""
        }
      ];
    },
    updateequip() {
      // this.equipments = this.Book.room.equipments
      this.Book.equipments = this.Book.room.equipments.filter(item => {
        return item.defaultcheck == true;
      });
    },
    updatefield() {
      console.log("update");
      this.Book.equipments[this.Book.equipments.length - 1].defaultcheck = true;
      this.Book.equipments[this.Book.equipments.length - 1].amount = 1;
    },
    setdata() {
      this.Book = {
        date: new Date().toISOString().substr(0, 10),
        user: {
          firstname: "Monar",
          lastname: "lisa"
        },
        start_time: "09:00:00",
        end_time: "12:00:00",
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
      };
    }
  }
};
</script>
<style>
.v-list {
  text-transform: uppercase;
}
</style>
