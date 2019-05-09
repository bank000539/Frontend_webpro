<template>
  <v-container fluid>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>ROOM NAME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="ROOM NAME"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>EQUIPMENTS</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-combobox
          v-model="select"
          :items="items"
          label="I use chips"
          multiple
          chips
        ></v-combobox>
        <v-list one-line >
          <template v-for="(item, index) in equipments" >
            <v-list-tile 
              :key="item.equipmentname"
              @click="" justify-center
            >
                {{item.equipmentname}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-text-field label="Amount" type="number" ></v-text-field >
                <v-switch v-model="item.defaultcheck" :label="`Default Check: ${item.defaultcheck.toString()}`"></v-switch>
                
            </v-list-tile>
            <v-divider
              :key="index"
              :inset="item.inset"
            ></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>ROOM</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select :items="items" label="Room"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>DESCRIPTION</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-textarea name="input-7-1" label="Description" value="EXAMPLE DESCRIPTION"></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">ADD</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">CONFIRM?</v-card-title>
          
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>ROOM NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="XXXXXXXXXXXXXXXXXXXXX" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>ROOM</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="ROOM1" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>ROOM</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="ROOM1" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>DESCRIPTION</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-textarea value="XXXXXXXXXXXXXXXXXXXXX" readonly></v-textarea>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="dialog = false">BACK</v-btn>
            <v-btn color="success" @click="dialog = false">CONFIRM</v-btn>
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
    items: ["ROOM1", "ROOM2", "ROOM3", "ROOM4"],
    dialog: false,
    select:[],
    equipments:[
      {
        equipmentname: "Test",
        amount: 1,
        defaultcheck: true,
        divider: true, inset: true 
      },
      {
        equipmentname: "Test",
        amount: 1,
        defaultcheck: true,
        divider: true, inset: true 
      },
    ]
  }),
  methods: {
    add(){

    },
      remove (item) {
        const index = this.select.indexOf(item.name)
        if (index >= 0) this.select.splice(index, 1)
      }
    }
};
</script>