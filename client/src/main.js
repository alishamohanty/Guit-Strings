// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {sync} from 'vuex-router-sync'
import colors from 'vuetify/es5/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.darken1, secondary: colors.cyan.lighten3, accent: colors.cyan.darken3, error: colors.pink.accent3, warning: colors.yellow.base, info: colors.blue.base, success: colors.green.base
  }
})
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
