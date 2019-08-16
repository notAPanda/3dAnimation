var path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'js/bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    }
  };