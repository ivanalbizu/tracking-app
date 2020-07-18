const getDate = today => {
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  if (month < 10) return `${day}-0${month}-${year}`
  else return `${day}-${month}-${year}`
}

module.exports = {
  getDate
}