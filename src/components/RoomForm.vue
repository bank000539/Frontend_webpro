<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>ROOM NAME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="ROOM NAME" v-model="Room.name" :readonly="_readonly"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>EQUIPMENTS</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-combobox
          v-model="Room.equipments"
          :items="equipments"
          label="EQUIPMENTS"
          item-text="name"
          multiple
          chips
          @change="updatefield()"
          :readonly="_readonly"
        ></v-combobox>
        <v-list one-line style="background-color: transparent;">
          <template v-for="(item, index) in Room.equipments">
            <v-list-tile :key="item._id" justify-center>
              {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-text-field label="Amount" :readonly="_readonly" v-model="item.amount" type="number"></v-text-field>
              <v-switch
                v-model="item.defaultcheck"
                :readonly="_readonly"
                :label="`Default Check: ${item.defaultcheck}`"
              ></v-switch>
            </v-list-tile>
            <v-divider :key="index" :inset="item.inset"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>SUPPORT</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          :items="supports"
          v-model="Room.support"
          :readonly="_readonly"
          item-text="firstname"
          item-value="firstname"
          return-object
          label="SUPPORT"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>DESCRIPTION</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-textarea
          name="input-7-1"
          label="DESCRIPTION"
          :readonly="_readonly"
          v-model="Room.description"
        ></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn v-if="_readonly==true" color="primary" dark :to="'/room'">CLOSE</v-btn>
          <v-btn v-if="_readonly==false" color="error" dark :to="'/room'">CANCEL</v-btn>
          <v-btn v-if="_readonly==false" color="primary" dark v-on="on">SAVE</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">CONFIRM?</v-card-title>

          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>ROOM NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Room.name" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>EQUIPMENTS</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-combobox
                v-model="Room.equipments"
                :items="Room.equipments"
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
              <v-subheader>SUPPORT</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Room.support.firstname" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>DESCRIPTION</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-textarea v-model="Room.description" readonly></v-textarea>
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
import axios from 'axios'
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    dialog: false,
    _readonly: false,
    Room: {
      name: "",
      support: "",
      description: "",
      equipments: []
    },
    supports: [],
    equipments: []
  }),
  methods: {
    async save() {
      if (this.$route.params.title == "edit") {
        console.log("Edit", this.$route.params.id, this.Room);
        this.Room.roomName = this.Room.name
        let data = this.Room
        delete data.name
        delete data._id
        let result = await axios.post('/room/editRoom',{_id:this.$route.params.id,data})
        if(result.data.code === 500){
        alert(result.data.result)
      }else{
        this.$router.push('/room')
      }
      } else {
        console.log("Add", this.Room);
        this.Room.roomName = this.Room.name
        let result = await axios.post('/room/createRoom',this.Room)
        console.log(result)
        if(result.data.code === 500){
        alert(result.data.result)
      }else{
        this.$router.push('/room')
      }
      }
      this.dialog = false;
    },
    async getdata() {
      this.supports = [
        {
          _id: "asd",
          firstname: "Meaw",
          lastname: "Min",
          email: "test@mail.com",
          role: "support",
          available: true
        },
        {
          _id: "asd2",
          firstname: "Meaw2",
          lastname: "Min2",
          email: "test@mail.com",
          role: "support",
          available: true
        },
        {
          _id: "asd3",
          firstname: "Meaw3",
          lastname: "Min2",
          email: "test@mail.com",
          role: "support",
          available: true
        }
      ];
      let data = await axios.post('/equipment/getEquipment',{})
      console.log(data)
      this.equipments = data.data.result.map(el=>{el.name = el.equipmentName;return el})
    },
    updatefield() {
      console.log(this.Room);
      this.Room.equipments[this.Room.equipments.length - 1].defaultcheck = true;
      this.Room.equipments[this.Room.equipments.length - 1].amount = 1;
    },
    async setdata() {
      let data = await axios.post('/room/getRoom',{})
        let id = this.$route.params.id
        let findData = data.data.result.find(el=>el._id===id)
        findData.name = findData.roomName
        this.Room=findData
    }
  },
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
  }
};
</script>