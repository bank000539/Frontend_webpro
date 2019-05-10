<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <router-link v-bind:to="{ name: 'Calandar' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>calendar_today</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>CALANDAR</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-if="isLogin" v-bind:to="{ name: 'DashBoard' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>DASHBOARD BOOKING</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-if="isLogin&&isAdmin" v-bind:to="{ name: 'Equipment' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>EQUIPMENT MANAGEMENT</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-if="isLogin&&isAdmin" v-bind:to="{ name: 'Room' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>ROOM MANAGEMENT</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-if="isLogin&&isAdmin" v-bind:to="{ name: 'User' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>USER MANAGEMENT</v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Booking Computer Engineering Room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="isLogin===false" flat v-bind:to="{ name: 'Login' }">LOGIN</v-btn>
        <v-btn v-if="isLogin===true" flat @click="logout">LOGOUT</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import "./assets/stylesheets/main.css";
import axios from "axios";
export default {
  data: () => ({
    drawer: null,
    isLogin: true,
    isAdmin: true,
  }),
  props: {
    source: String
  },
  created() {
    this.checkIfIsLogIn();
  },
  // updated() {
  //   this.checkIfIsLogIn();
  // },
  methods: {
    async logout() {
      let result = await axios.post("auth/logout", this.User);
      console.log(result);
      if (result.data.code === 500) {
        alert(result.data.result);
      } else {
        this.isLogin = false;
        this.isAdmin = false;
        this.$router.push("/");
      }
    },
    async checkIfIsLogIn() {
      let result = await axios.post("auth/checkLogin", this.User);
      console.log(result);
      if (result.data.code === 500) {
        alert(result.data.result);
        this.isAdmin = false;
      } else {
        this.isAdmin = false;
        if (result.data.result != null) {
          this.isLogin = true;
          if (result.data.result.role == "admin") {
            this.isAdmin = true;
          }
        } else {
          this.isLogin = false;
        }
      }
    },
    async checkLogIn() {
      let result = await axios.post("auth/checkLogin", this.User);
      console.log(result);

      if (result.data.code === 500) {
        alert(result.data.result);

          return false
        this.isAdmin = false;
      } else {
        this.isAdmin = false;
        if (result.data.result != null) {
          return true
          if (result.data.result.role == "admin") {
            this.isAdmin = true;
          }
        } else {
          return false
        }
      }
    }
  }
};
</script>