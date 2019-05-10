<template >
  <v-container fluid>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>First Name</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="FirstName" v-model="Book.user.firstName" readonly></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>Last Name</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="LastName" v-model="Book.user.lastName" readonly></v-text-field>
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
          :disabled="editmode"
          :readonly="_readonly"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="Book.date"
              :disabled="editmode"
              :readonly="_readonly"
              label="Date"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="Book.date"
            :disabled="editmode"
            :readonly="_readonly"
            no-title
            scrollable
          >
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
        <v-text-field
          label="Time"
          v-model="Book.start_time"
          :disabled="editmode"
          :readonly="_readonly"
          type="time"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>END TIME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field
          label="Time"
          v-model="Book.end_time"
          :disabled="editmode"
          :readonly="_readonly"
          type="time"
        ></v-text-field>
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
          :disabled="editmode"
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
          :disabled="editmode"
          :readonly="_readonly"
        ></v-combobox>
        <v-list one-line style="background-color: transparent;">
          <template v-for="(item, index) in Book.equipments">
            <v-list-tile :key="item._id" justify-center>
              {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-text-field
                label="Amount"
                :disabled="editmode"
                :readonly="_readonly"
                :value="item.amount"
                type="number"
              ></v-text-field>
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
        <v-text-field
          v-model="Book.subject"
          :disabled="editmode"
          :readonly="_readonly"
          label="SUBJECT"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>STATUS</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          :items="status"
          :readonly="_readonlystatus"
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
          :disabled="$route.params.title ==='add'"
          v-model="Book.checkout"
          :readonly="_readonlycheckout"
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
          :disabled="editmode"
          v-model="Book.description"
          label="Description"
        ></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn v-if="_readonly==true" color="primary" dark :to="'/dashboard'">CLOSE</v-btn>
          <v-btn v-if="_readonly==true" color="info" dark @click="download">Download PDF</v-btn>
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
import jsPDF from "jspdf";
import axios from "axios";
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
    _readonlystatus: false,
    _readonlycheckout: false,
    editmode: false,
    Book: {
      date: new Date().toISOString().substr(0, 10),
      user: {
        firstName: "",
        lastName: ""
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
  async created() {
    if (this.$route.params.title == "view") {
      this._readonly = true;
      this._readonlystatus = true;
      this._readonlycheckout = true;
      
      this.setdata();
    } else if (this.$route.params.title == "add") {
      this.getdata();

      this._readonlystatus = false;

      this._readonlycheckout = true;
      (this.status = ["waiting"]), (this._readonly = false);
    } else {
      this.editmode = true;
      this._readonly = false;
      this.setdata();
    }
  },
  methods: {
    async save() {
      if (this.$route.params.title == "edit") {
        console.log("Edit", this.$route.params.id, this.Book);
        let update = { checkout: this.Book.checkout, status: this.Book.status };
        let result = await axios.post("/room/editBooking", {
          _id: this.$route.params.id,
          data: update
        });
        if (result.data.code === 500) {
          alert(result.data.result);
        } else {
          this.$router.push("/dashboard");
        }
      } else {
        console.log("Add", this.Book);
        let bookData = this.Book;
        let dateTime = bookData.date.split("-");
        let day = new Date(
          parseInt(dateTime[0]),
          parseInt(dateTime[1]),
          parseInt(dateTime[2])
        );
        day.setHours(parseInt(bookData.start_time.split(":")[0]));
        day.setMinutes(parseInt(bookData.start_time.split(":")[1]));
        bookData.start = day.getTime();
        day.setHours(parseInt(bookData.end_time.split(":")[0]));
        day.setMinutes(parseInt(bookData.end_time.split(":")[1]));
        bookData.end = day.getTime();
        bookData.roomName = bookData.room.roomName;
        bookData.equipment = bookData.equipments;
        console.log(bookData);
        let result = await axios.post("/room/bookingRoom", bookData);
        if (result.data.code === 500) {
          if (typeof result.data.result === typeof "") {
            alert(result.data.result);
          } else {
            alert(
              "booking overlap " +
                new Date(result.data.result.start).toString() +
                " - " +
                new Date(result.data.result.end).toString()
            );
          }
        } else {
          this.$router.push("/dashboard");
        }
      }
      this.dialog = false;
    },
    async getdata() {
      let resultUser = await axios.post("auth/checkLogin", this.User);
      console.log(resultUser.data.result);
      if (this.$route.params.title == "add") {
        this.Book.user = {
          firstName: resultUser.data.result.firstName,
          lastName: resultUser.data.result.lastName
        };
      }

      let result = await axios.post("/room/getRoom", {});
      console.log(result);
      this.rooms = result.data.result.map(el => {
        el.name = el.roomName;
        return el;
      });
      let data = await axios.post("/equipment/getEquipment", {});
      console.log(data);
      this.equipments = data.data.result.map(el => {
        el.name = el.equipmentName;
        return el;
      });
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
    async setdata() {
      await this.getdata();
      let result2 = await axios.post("/room/getBooking", {});
      let bookData = result2.data.result.find(el => {
        return el._id === this.$route.params.id;
      });
      this.Book.checkout = bookData.checkout;
      this.Book.description = bookData.description;
      this.Book.subject = bookData.subject;
      this.Book.status = bookData.status;
      if (this.Book.status == "approve" && this.$route.params.title == "edit") {
        this._readonlystatus = true;
        this._readonlycheckout = false;
      }
      else if ( this.$route.params.title == "edit") {
        this._readonlystatus = false;
        this._readonlycheckout = true;
      }

      let time = new Date(bookData.start);
      (this.Book.date = time.toISOString().substr(0, 10)),
        (this.Book.equipments = bookData.equipment);
      this.Book.start_time =
        (time.getHours().toString().length !== 1
          ? time.getHours()
          : "0" + time.getHours()) +
        ":" +
        (time.getMinutes().toString().length !== 1
          ? time.getMinutes()
          : time.getMinutes() + "0");
      time = new Date(bookData.end);
      this.Book.end_time =
        (time.getHours().toString().length !== 1
          ? time.getHours()
          : "0" + time.getHours()) +
        ":" +
        (time.getMinutes().toString().length !== 1
          ? time.getMinutes()
          : time.getMinutes() + "0");
      this.Book.user = bookData.user;
      this.Book.room = bookData.roomName;
      let temp = this.Book;
      this.Book = {};
      this.Book = temp;
    },
    download() {
      var doc = new jsPDF();
      doc.setFontSize(25);
      doc.setFont("tahoma");
      doc.setFontType("bold");
      doc.text(30, 40, "Booking Computer Engineering Room");

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 70, "Name:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(
        80,
        70,
        this.Book.user.firstName + " " + this.Book.user.lastName
      );

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 80, "Date:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(80, 80, this.Book.date);

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 90, "From time:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(80, 90, this.Book.start_time);
      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(120, 90, "To:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(160, 90, this.Book.end_time);

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 100, "Room:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(80, 100, this.Book.room);

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 110, "Subject:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(80, 110, this.Book.subject);

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 120, "Status:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(80, 120, this.Book.status);

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 130, "Checkout:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      doc.text(80, 130, this.Book.checkout.toString());

      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, 140, "Equipments:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      var verticalOffset = 150;
      for (var i = 0; i < this.Book.equipments.length; i++) {
        // console.log(this.Book.equipments[i]);
        doc.text(40, verticalOffset, this.Book.equipments[i].name);
        doc.setFontSize(20);
        doc.setFontType("bold");
        doc.text(120, verticalOffset, "Amount:");
        doc.setFontSize(18);
        doc.setFontType("normal");
        doc.text(
          160,
          verticalOffset,
          this.Book.equipments[i].amount.toString()
        );
        verticalOffset += 10;
      }
      // var loremipsum =
      //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\n\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.";
      var loremipsum = this.Book.description;
      var lines = doc.splitTextToSize(loremipsum, 120);
      // console.log(lines);
      doc.setFontSize(20);
      doc.setFontType("bold");
      doc.text(20, verticalOffset, "Description:");
      doc.setFontSize(18);
      doc.setFontType("normal");
      var linepage = lines;
      if (lines.length >= 14) {
        lines = linepage.splice(0, 14);
        doc.text(80, verticalOffset + 18 / 72, lines);
        if (linepage.length >= 0) {
          doc.addPage();

          doc.setFontSize(25);
          doc.setFont("tahoma");
          doc.setFontType("bold");
          doc.text(30, 40, "Booking Computer Engineering Room");
          verticalOffset = 70;

          doc.setFontSize(18);
          doc.setFontType("normal");
          doc.text(80, verticalOffset + 18 / 72, lines);
        }
      } else {
        doc.text(80, verticalOffset + 18 / 72, lines);
      }

      doc.save("Booking.pdf");
    }
  }
};
</script>
<style>
.v-list {
  text-transform: uppercase;
}
</style>
