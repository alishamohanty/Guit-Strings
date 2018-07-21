<template>
  <panel title="Bookmarks">
    <v-data-table
    :headers="headers"
    :items="bookmarks"
    :pagination.sync="pagination"
    class="elevation-1"
    >
    <template  slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.title }}</td>
      <td class="text-xs-left">{{ props.item.artist }}</td>
    </template>
  </v-data-table>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import BookmarksService from '@/services/BookmarksService'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: {
        sortBy: 'date',
        descending: true
      },
      bookmarks: [
      ]
    }
  },
  components: {
    Panel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
    console.log(this.bookmarks)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
