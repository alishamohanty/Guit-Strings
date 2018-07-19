import Api from '@/services/Api'

export default {
  index (bookmark) {
    console.log('Inside frontend index')
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    console.log('bookmark inside post method of BookmarksService is', bookmark)
    return Api().post('bookmarks', bookmark)
  },
  delete (bookmarkId) {
    return Api().get(`bookmarks/${bookmarkId}`)
  }
}
