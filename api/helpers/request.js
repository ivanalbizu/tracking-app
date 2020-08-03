const fspromises = require('./fspromises');
const date = require('./date');


const startNewMonth = async (file, email) => {
  const read = await fspromises.readPromise(`./data/${email}/user-template.json`)
  const data = await JSON.parse(read)
  await fspromises.writePromise(file, JSON.stringify(data, null, 2))
  return data
}

const getData = async (req, res) => {
  try {
    const today = date.getDate(new Date());
    const email = req.user.email;
    const file = `./data/${email}/${today.split('-')[2]}-${today.split('-')[1]}.json`;
    const read = await fspromises.readPromise(file);
    const data = await JSON.parse(read);
    return { data, today, file };
  } catch (error) {
    console.log('Error al obtener los datos de usuario (getData) : ', error);
    throw (error)
  }
}

const getDataTrack = async (req, res) => {
  let data;
  try {
    const today = date.getDate(new Date());
    const email = req.user.email;

    const file = `./data/${email}/${today.split('-')[2]}-${today.split('-')[1]}.json`;
    const exist = await fspromises.checkFileExists(file);
    if (!exist) {
      data = await startNewMonth(file, req.user.email)
    } else {
      const read = await fspromises.readPromise(file);
      data = await JSON.parse(read);
    }
    return { data, today, file };
  } catch (error) {
    console.log('Error al obtener los datos de usuario (getDataTrack) : ', error);
    throw (error)
  }
}

module.exports = {
  getData,
  getDataTrack
}