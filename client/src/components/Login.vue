<template>
 <div class="container">
  <v-layout column>
    <v-flex xs12 sm8 md4>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan darken-1">
          <v-toolbar-title>
            Login
          </v-toolbar-title>
        </v-toolbar>
        <div class="ml-5 pl-4 pr-4 pt-2 pb-2 mr-5 mt-5">
          <v-text-field prepend-icon="person" type="email" name="email"  v-model="email" label="Email"></v-text-field>
          <br>
         <v-text-field prepend-icon="lock" type="password" name="password"  v-model="password" label="Password" ></v-text-field>
          <br>
          <div class="error" v-html="error"/>
          <div class="message" v-html="message"/>
          <br>
          <v-btn class="cyan darken-2" @click="login" dark> Login </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      message: ''
    }
  },
  methods: {
    async login () {
      try {
        console.log('Inside Login method of Login.vue')
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.token)
        console.log(response.data)
        this.error = ''
        this.message = 'Successfully Login into your Account'
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container{
  justify-content: center;
  display: flex;
}
.message {
  color: #00ACC1;
  font-weight: bold;
}
</style>
