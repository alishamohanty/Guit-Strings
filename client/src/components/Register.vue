<template>
  <div class="">
   <h1>Register</h1>
   <input type="email" name="email" placeholder="email" v-model="email">
   <br>
   <input type="password" name="password" placeholder="password" v-model="password">
   <br>
   <button @click="register">Register</button>
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

</style>
