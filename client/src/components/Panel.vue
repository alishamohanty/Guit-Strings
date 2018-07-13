<template>
 <div class="container">
  <v-layout column>
    <v-flex xs12 sm8 md4>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan darken-1">
          <v-toolbar-title>
            {{title}}
          </v-toolbar-title>
        </v-toolbar>
        <slot>
            There is no content defined!
        </slot>
      </div>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
export default {
  props: [
    'title'
  ]
}
</script>
<style scoped>

</style>
