<template>
  <v-layout>
    <v-flex lg5>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan darken-1">
          <v-toolbar-title>
            Songs Meta Data
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 mt-4 pb-5">
          <v-text-field type="text" name="text"  v-model="song.title" label="Title" required :rules="[required]"></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.artist" label="Artist" required :rules="[required]"></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.genre" label="Genre" required :rules="[required]"></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.album" label="Album" required :rules="[required]"></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.albumImageURL" label="Album Image URL" required :rules="[required]"></v-text-field>
          <v-text-field type="text" name="text"  v-model="song.youtubeId" label="YouTube ID" required :rules="[required]"></v-text-field>
        </div>
      </div>
    </v-flex>
    <v-flex lg7 class="ml-1">
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan darken-1">
          <v-toolbar-title>
            Song Structure
          </v-toolbar-title>
        </v-toolbar>
        <v-textarea class="pl-4 pr-4 pt-3 pb-2 mt-1"
          outline
          required :rules="[required]"
          name="input-7-4"
          label="Tab Chords"
          v-model="song.tab"
        ></v-textarea>
        <v-textarea class="pl-4 pr-4 pt-3 pb-3 mb-2"
          outline
          name="input-7-5"
          label="Lyrics"
          required :rules="[required]"
          v-model="song.lyrics"
        ></v-textarea>
          <div  class="danger-alert" v-if="error">{{error}} </div>
        <v-btn class="cyan darken-2 mb-3" dark @click="create">
          Create a Song
        </v-btn>
      </div>
    </v-flex>
    <br>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
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
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async create () {
      try {
        this.error = null
        const areAllFieldsFilled = Object
          .keys(this.song)
          .every(key => this.song[key])
        if (!areAllFieldsFilled) {
          this.error = ' Please enter all the required fields'
          return
        }
        console.log('Inside try')
        const song = await SongsService.post(this.song)
        console.log(song)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        console.log('This is an error')
        console.log(this.error)
      }
    }
  },
  components: {
    Panel
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
