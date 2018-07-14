<template>
  <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan darken-1">
          <v-toolbar-title>
            Songs
          </v-toolbar-title>
          <v-btn
            fab
            dark
            color="cyan darken-3"
            medium
            right
            absolute
            middle
            @click="navigateTo({ name: 'songs-create'})">
        <v-icon>add</v-icon>
      </v-btn>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <div slot="songs">
            <div v-for="song in songs "
          :key="song.title">
             <v-layout class="song">
              <v-flex xs8 class="pt-5">
                <div class="song-title">
                   Song Title: {{song.title}}
                </div>
                <div class="song-artist">
                   Song Artist: {{song.artist}}
                </div>
                <div class="song-genre">
                   Song Genre: {{song.genre}}
                </div>
                <v-btn class="cyan darken-2" @click="navigateTo({name: 'song', params: {
                  songId: song.id
                 } })"
                dark> View </v-btn>
              </v-flex>
              <v-flex xs6>
                <img class="image-url" :src="song.albumImageURL">
              </v-flex >
             </v-layout>
        </div>
      </div>
    </div>
      </div>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
    console.log(this.songs)
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-btn--floating .v-icon {
    height: 50%;
}
.image-url {
  height: 300px;
  width: 270px;
}
.song {
  font-size: 2rem;
}
</style>
