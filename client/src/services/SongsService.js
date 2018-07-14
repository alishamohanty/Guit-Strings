import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
  },
  post (song) {
    console.log('Inside songs service')
    return Api().post('songs', song)
  }
}
