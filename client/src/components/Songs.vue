<template>
 <panel title="Songs">
    <div v-for="song in songs "
    :key="song.title">
      {{ song.title }}
    </div>
 </panel>
</template>

<script>
import panel from '@/components/Panel'
import songsservice from '@/services/SongsService'
export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = await songsservice.index()
  },
  components: {
    panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
