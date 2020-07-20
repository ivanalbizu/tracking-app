const fspromises = require('../helpers/fspromises');
const date = require('../helpers/date');

const getData = async (email) => {
  try {
    const today = date.getDate(new Date());
    const file = `./data/${email}/${today.split('-')[2]}-${today.split('-')[1]}.json`;
    const read = await fspromises.readPromise(file);
    const data = await JSON.parse(read);
    return { data, today, file };
  } catch (error) {
    console.log('Error al obtener los datos de usuario : ', error);
    throw (error)
  }
}

const clients = {};

module.exports = io => {
  io.on('connection', socket => {

    socket.on('disconnect', () => {
      console.log('Desconectado :>> ', socket.id);
    });
    
    socket.on('user_enter', (data) => {
      clients[data] = socket.id;
      console.log('clients enter:>> ', clients);
    });

    socket.on('user_pause', (data) => {
      console.log('pausa:>> ', data);
    });
    
    socket.on('user_leave', async (mail) => {
      io.sockets.emit('CLIENT_CLOSE', mail);
      delete clients[mail]

      const { data, today, file } = await getData(mail);
      const trackToday = data.tracking[today]
      if (trackToday) {
        if (data.tracking[today][trackToday.length-1]["time_end"] == "En curso") {
          data.tracking[today][trackToday.length-1]["time_end"] = (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          await fspromises.writePromise(file, JSON.stringify(data, null, 2))
        }
      }
    });

  });
}