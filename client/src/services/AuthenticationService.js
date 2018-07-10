import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    console.log('This is credential', credentials)
    return Api().post('login', credentials)
  }
}
