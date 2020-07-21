import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import socket from './socket'
import notify from './notify'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    socket,
    notify
  }
})
