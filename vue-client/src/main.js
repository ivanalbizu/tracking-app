import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import Toasted from 'vue-toasted'
import VModal from 'vue-js-modal'


Vue.use(Toasted, {
  duration: 5000,
  position: 'bottom-right'
})
Vue.use(VModal)

require('@/store/subscriber')

axios.defaults.baseURL = 'api/'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://calm-sierra-02190.herokuapp.com/',
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