<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field v-model="User.username" type="email" label="Username (E-mail)" clearable></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 offset-sm3>
          <v-text-field v-model="User.password" label="Password" clearable></v-text-field>
        </v-flex>
      </v-layout>
      <v-flex class="text-xs-center">
        <router-link to="/register">
        <v-btn color="primary">Register</v-btn></router-link>

        <v-btn color="success" @click="login">LOGIN</v-btn>
      </v-flex>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      User:{
        username:"",
        password:""
      }
    };
  },
  methods:{
    async login(){
      let result = await axios.post('auth/login',this.User)
      console.log(result)
      if(result.data.code === 500){
        alert(result.data.result)
      }else{
        this.$router.push('/')
      }
    }
  }
};
</script>