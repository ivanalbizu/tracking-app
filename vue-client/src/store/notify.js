const notify = {
  namespaced: true,

  state: {
    notifyUser: false
  },

  getters: {
    notify(state) {
      return state.notifyUser
    }
  },

  mutations: {
    SET_NOTIFY(state, data) {
      state.notifyUser = data
    },
  },

  actions: {
    notifyUser(interval) {
      let timeInterval = null;

      if (!Notification) {
        alert("Este navegador no soporta las notificaciones del sistema");
        return;
      }

      if (Notification.permission !== "granted") Notification.requestPermission();

      const title = 'Simple Title';
      const options = {
        icon: 'https://via.placeholder.com/512x512',
        body: 'Simple piece of body text.\nSecond line of body text :)'
      };

      timeInterval = window.setInterval(() => {
        new Notification(title, options);
        console.log(timeInterval);
      }, interval);
      setTimeout(() => {
        window.clearInterval(timeInterval);
      }, 10000);
    }
  }
}

export default notify