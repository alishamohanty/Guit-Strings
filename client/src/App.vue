<template>
 <div id="app">
    <v-app>
      <page-header/>
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>
      <page-footer/>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.danger-alert {
  color: red;
}
</style>
