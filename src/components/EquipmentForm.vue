<template>
  <v-container fluid>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>EQUIPMENT NAME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="EQUIPMENT NAME"></v-text-field>
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
              <v-subheader>EQUIPMENT NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field value="XXXXXXXXXXXXXXXXXXXXX" readonly></v-text-field>
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
    dialog: false
  })
};
</script>