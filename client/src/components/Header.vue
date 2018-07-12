<template>
  <v-toolbar dark class="cyan darken-3">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
        <span class ="logo" @click="navigateTo({ name: 'root'})" flat>TabTrack</span>
    </v-toolbar-title>
    <v-toolbar-items class="pl-3">
        <v-btn flat class="refresh">
          <v-icon>refresh</v-icon>
        </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
            Browse
        </v-btn>
        <v-btn v-if=" !$store.state.isUserLoggedIn " flat @click="navigateTo({ name: 'login'})">
          Login
        </v-btn>
        <v-btn v-if=" $store.state.isUserLoggedIn " flat @click="logout">
          Log Out
        </v-btn>
        <v-btn v-if=" !$store.state.isUserLoggedIn " flat @click="navigateTo({ name: 'register'})">
          Sign Up
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>
<style scoped>
.logo {
  cursor:pointer;
  font-weight: bold;
}
.refresh:hover
{
  opacity: 0.8;
}
</style>
