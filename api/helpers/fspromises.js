const fs = require('fs')

// Reads text from the file asynchronously.
// Returns a Promise.
const readPromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// Writes given text to a file asynchronously.
// Returns a Promise.
const writePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(err)
      resolve('success')
    });
  });
}

// returns a promise which resolves true if file exists
const checkFileExists = file => {
  return new Promise((resolve, reject) => {
    fs.access(file, fs.F_OK, error => {
      resolve(!error);
    });
  });
}

const createDir = dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    return true;
  } else {
    return false;
  }
}

async function files(path) {
  const filesArr = [];
  const files = await fs.promises.readdir(path);
  for (const file of files) {
    if (file.match(/^\d/)) {
      filesArr.push(file);
    }
  }
  return JSON.stringify(filesArr);
}

module.exports = {
  checkFileExists,
  readPromise,
  writePromise,
  createDir,
  files
}