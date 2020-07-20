const socket = {
  state: {
    io: {}
  },

  mutations: {
    SET_SOCKET: (state, socket) => {
      state.io = socket;
    },
    SOCKET_CLIENT_CLOSE (state) {
      state.io = {};
    }
  }
};

export default socket;