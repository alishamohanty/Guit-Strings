<template>
   <v-container grid-list-md >
      <v-layout row wrap>
          <v-flex xs12 class="pt-5">
              <div class="white elevation-2 ">
                <v-toolbar flat dense dark class="cyan darken-1">
                  <v-toolbar-title class="song-title">
                    {{song.title}}
                  </v-toolbar-title>
                 <v-spacer></v-spacer>
                   <span class="song-artist">- By {{song.artist}}</span>
                      <v-btn
                        fab
                        dark
                        color="cyan darken-3"
                        medium
                        right
                        absolute
                        title="Edit"
                        middle
                        @click="navigateTo({ name:'song-edit', params: {
                  songId: songId
                 }})">
                    <v-icon>edit</v-icon>
                    </v-btn>
                      <v-btn
                        v-if="isUserLoggedIn && !isBookmarked"
                        fab
                        right
                        dark
                        color="cyan darken-3"
                        medium
                        absolute
                        middle
                        class="book"
                        title="Bookmark"
                        @click="bookmark()">
                    <v-icon>bookmark</v-icon>
                    </v-btn>
                      <v-btn
                        v-if="isUserLoggedIn && isBookmarked"
                        fab
                        right
                        dark
                        color="cyan darken-3"
                        medium
                        absolute
                        middle
                        class="unbook"
                        title="Unbookmark"
                        @click="unbookmark">
                    <v-icon>bookmark_border</v-icon>
                  </v-btn>
                </v-toolbar>
        <v-layout>
            <v-flex xs8 class="pt-5 top-panel">
                <youtube
                :video-id="song.youtubeId"
                :player-width="600"
                :player-height="280"></youtube>
            </v-flex>
            <v-flex >
                <img class="image-url pt-2" :src="song.albumImageURL">
                <div class="song-genre-album">
                   Genre: {{song.genre}}
                   <br>
                   Album: {{song.album}}
                </div>
            </v-flex>
        </v-layout>
              </div>
        </v-flex>
            <v-flex xs6 class="pl-1">
                <div class="white elevation-2" text-xs-center>
                    <v-toolbar flat dense dark class="cyan darken-1">
                    <v-toolbar-title>
                        Tabs
                    </v-toolbar-title>
                    </v-toolbar>
                    <v-textarea
                      class="pl-5"
                      height="300px"
                      readonly
                      v-model="song.tab"
                    ></v-textarea>
                </div>
            </v-flex>
            <v-flex xs16 class="ml-2">
                <div class="white elevation-2">
                    <v-toolbar flat dense dark class="cyan darken-1">
                    <v-toolbar-title>
                        Lyrics
                    </v-toolbar-title>
                    </v-toolbar>
                    <v-textarea
                    text-lg-center
                      class="pl-5"
                      height="300px"
                            readonly
                            v-model="song.lyrics"
                    ></v-textarea>
            </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
import SongsService from '@/services/SongsService'
import BookmarksService from '@/services/BookmarksService'
import YouTube from 'vue-youtube-embed'
export default {
  data () {
    return {
      song: '',
      songId: this.$store.state.route.params.songId,
      isBookmarked: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    console.log(songId)
    this.song = (await SongsService.show(songId)).data
    console.log(this.song)
    const bookmark = (await BookmarksService.index({
      songid: this.songId,
      userid: this.$store.state.user.id
    })).data
    this.isBookmarked = !!bookmark
    console.log('bookmarked?', this.isBookmarked)
  },
  components: {
    YouTube
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async bookmark () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        await BookmarksService.post({
          SongId: this.songId,
          UserId: this.$store.state.user.id
        })
        console.log('Bookmarked')
      } catch (error) {
        console.log(error)
      }
    },
    async unbookmark () {
      try {
        console.log('Inside Unbookmark method')
        await BookmarksService.delete({
          songId: this.songId,
          userId: this.$store.state.user.id
        })
        console.log('Unbookmarked')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  textarea {
    text-align: center;
    border: none;
  }
  .song-title {
    font-size: 2rem;
  }
  .song-artist {
    font-size: 1.5rem;
    padding-right:126px;
  }
  .song-genre-album {
    font-size: 1.8rem;
    color:#00838F;
  }
  .image-url {
  height: 300px;
  width: 270px;
}
.v-btn--floating .v-icon {
    height: 50%;
}
.book {
  margin-right: 65px;
}
.unbook {
  margin-right: 65px
}
</style>
