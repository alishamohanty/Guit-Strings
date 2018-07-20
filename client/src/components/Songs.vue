<template>
  <v-layout>
    <v-flex xs5>
      <song-bookmark/>
    </v-flex>
    <v-flex xs10 class="ml-2">
      <div class="white elevation-2">
              <v-toolbar flat dense dark class="cyan lighten-1">
                <v-text-field
                  right
                  prepend-icon="search"
                  class= "sea"
                  placeholder="Search by Song Title, artist, album, or genre"
                  v-model= "search"
                ></v-text-field>
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
    </v-flex>
  </v-layout>

</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
import SongBookmark from '@/components/SongBookmark'
import _ from 'lodash'
export default {
  name: 'Songs',
  data () {
    return {
      songs: null,
      search: ''
    }
  },
  components: {
    Panel,
    SongBookmark
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.search = value
        console.log(value)
        const find = (await SongsService.index(value)).data
        console.log(find)
        this.songs = find
      }
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
  font-size: 2.3rem;
  font-family: 'Gaegu', cursive;

}
.sea {
  padding-left: 30px;
  padding-top: 22px;
  width: 40px;
}
</style>
