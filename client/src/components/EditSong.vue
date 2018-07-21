<template>
  <v-layout>
    <v-flex lg5>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="light-green darken-2">
          <v-toolbar-title>
            Songs Meta Data
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 mt-4 pb-5">
          <v-text-field type="text" name="text"  v-model="song.title" label="Title" ></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.artist" label="Artist" ></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.genre" label="Genre" ></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.album" label="Album" ></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.albumImageURL" label="Album Image URL"></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.youtubeId" label="YouTube ID"></v-text-field>
        </div>
      </div>
    </v-flex>
    <v-flex lg7 class="ml-1">
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="light-green darken-2">
          <v-toolbar-title>
            Song Structure
          </v-toolbar-title>
        </v-toolbar>
        <v-textarea class="pl-4 pr-4 pt-3 pb-2 mt-1"
          outline
          name="input-7-4"
          label="Tab Chords"
          v-model="song.tab"
        ></v-textarea>
        <v-textarea class="pl-4 pr-4 pt-3 pb-3 mb-2"
          outline
          name="input-7-5"
          label="Lyrics"
          v-model="song.lyrics"
        ></v-textarea>
          <div  class="danger-alert" v-if="error">{{error}} </div>
        <v-btn class="light-green lighten-1 mb-3" dark @click="put">
          Update the Song
        </v-btn>
      </div>
    </v-flex>
    <br>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  name: 'create',
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageURL: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    console.log('This is songId in edit song', songId)
    this.song = (await SongsService.show(songId)).data
    console.log(this.song)
  },
  components: {
    Panel
  },
  methods: {
    async put () {
      const newSong = this.song
      const updatedSong = (await SongsService.put(newSong)).data
      console.log(updatedSong)
      this.$router.push({name: 'songs'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
