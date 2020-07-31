import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  duration: 5000,
  position: 'bottom-right'
})

require('@/store/subscriber')

axios.defaults.baseURL = 'http://localhost:8081/api/'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8081',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    beforeCreate() {
      store.commit('SET_SOCKET', this.$socket)
    },
    render: h => h(App)
  }).$mount('#app')
})