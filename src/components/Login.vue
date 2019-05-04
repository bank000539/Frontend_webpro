<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field v-model="message1" label="Username (E-mail)" clearable></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 offset-sm3>
          <v-text-field v-model="message2" label="Password" clearable></v-text-field>
        </v-flex>
      </v-layout>
      <v-flex class="text-xs-center">
        <v-btn color="success">LOGIN</v-btn>
      </v-flex>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>