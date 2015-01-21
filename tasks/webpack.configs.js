var path = require('path');

module.exports = {

  dev: {
    devtool: 'source-map',
    entry: './dev/input-validator-example.jsx', //'./dev/dev.jsx',
    output: {
      filename: 'bundle.js',
      path: __dirname,
      // publicPath: 'dev/'
    },
    
    module: {
      loaders: [
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' }
      ],
      postLoaders: [
        { loader: path.join(__dirname, './jstransform-loader'), exclude: /node_modules/ }
      ]
    },
  },

  test: {
    devtool: 'source-map',
    cache: true,
    module: {
      loaders: [
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
      ],
      postLoaders: [
        { loader: path.join(__dirname, './jstransform-loader'), exclude: /node_modules/ }
      ]
    },
  }
}