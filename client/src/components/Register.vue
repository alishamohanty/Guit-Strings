<template>
 <div class="container">
  <v-layout column>
    <v-flex xs12 sm8 md4>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan darken-2">
          <v-toolbar-title>
            Register
          </v-toolbar-title>
        </v-toolbar>
        <div class="ml-5 pl-4 pr-4 pt-2 pb-2 mr-5 mt-5">
          <v-text-field prepend-icon="person" type="email" name="email"  v-model="email" label="Email"></v-text-field>
          <br>
         <v-text-field prepend-icon="lock" type="password" name="password"  v-model="password" label="Password" ></v-text-field>
          <br>
          <div class="error" v-html="error"/>
          <br>
          <v-btn color="primary" class="but" @click="register"> Register </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        console.log('Inside register method of registe.vue')
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
.container{
  justify-content: center;
  display: flex;
}
.but
{
  color: white;
  background-color: #0097A7;
}

</style>
