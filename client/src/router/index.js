import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs'
import CreateSong from '@/components/CreateSongs'
import Song from '@/components/Song'
import EditSong from '@/components/EditSong'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'songs'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/song/:songId',
      name: 'song',
      component: Song
    },
    {
      path: '/song/:songId/edit',
      name: 'song-edit',
      component: EditSong
    }
  ]
})
