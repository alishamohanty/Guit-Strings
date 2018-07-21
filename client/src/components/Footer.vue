<template>
  <v-footer
    dark
    height="10"
    color="light-green darken-3"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-actions class="light-green darken-4 justify-center">
        &copy;2018 — <strong>Alisha Mohanty</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
