import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import socket from './modules/socket'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    socket,
    notification
  }
})
