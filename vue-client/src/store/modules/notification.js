const notification = {
  state: {
    notification: 3000
  },

  getters: {
    notification (state) {
      return state.notification
    }
  },

  mutations: {
    SET_NOTIFICATION: (state, notification) => {
      state.notification = notification;
    }
  }
}

export default notification