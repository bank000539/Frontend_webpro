<template>
  <v-container fluid>
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
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="date" label="Date" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>START TIME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field value="XX/XX" readonly></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>END TIME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field value="XX/XX" readonly></v-text-field>
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
        <v-subheader>SUBJECT</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="SUBJECT"></v-text-field>
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

        <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>STATUS</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select :items="status" label="Status"></v-select>
      </v-flex>
    </v-layout>

          <v-flex class="text-xs-center">
        <v-btn color="success">SUBMIT</v-btn>
      </v-flex>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    items: ["ROOM1", "ROOM2", "ROOM3", "ROOM4"],
    status: ["WATING", "APPROVE", "DENIED"],
    dialog: false
  })
};
</script>