import Api from '@/services/Api'

export default {
  index (sea) {
    return Api().get('songs', {
      params: {
        search: sea
      }
    })
  },
  show (songId) {
    return Api().get(`songs/${songId}`)
  },
  post (song) {
    console.log('Inside songs service')
    return Api().post('songs', song)
  },
  put (song) {
    return Api().put(`song/${song.id}`, song)
  }
}
