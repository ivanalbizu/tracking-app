const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../api/public'),
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8081'
      }
    }
  }
}