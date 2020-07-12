const fspromises = require('./fspromises');

const getDate = today => {
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  if (month < 10) return `${day}-0${month}-${year}`
  else return `${day}-${month}-${year}`
}

const getData = async (req, res) => {
  try {
    const today = getDate(new Date());
    const email = req.user.email;
    const file = `./data/${email}/${today.split('-')[2]}-${today.split('-')[1]}.json`;
    const read = await fspromises.readPromise(file);
    const data = await JSON.parse(read);
    return { data, today, file };
  } catch (error) {
    console.log('Error al obtener los datos de usuario : ', error);
    throw (error)
  }
}

const getDataTrack = async (req, res) => {
  try {
    const today = getDate(new Date());
    const email = req.user.email;
    console.log('today :>> ', today);
    const file = `./data/${email}/${today.split('-')[2]}-${today.split('-')[1]}.json`;
    const read = await fspromises.readPromise(file);
    const data = await JSON.parse(read);
    return { data, today, file };
  } catch (error) {
    console.log('Error al obtener los datos de usuario : ', error);
    throw (error)
  }
}

module.exports = {
  getData,
  getDataTrack
}