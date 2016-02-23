var options = require('yargs').argv;

var path = require('path')
var webpack = require('webpack')

var devHost = 'http://localhost:2992';

module.exports = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './public/index.js'
    ],
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: '/',
      filename: 'bundle.js',
      publicPath: (options.hot ? devHost : '') + '/static/'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: [ 'react-hot', 'babel' ],
            exclude: /node_modules/,
            include: __dirname
          },
          {
            test: /\.css?$/,
            loaders: [ 'style', 'css' ],
            include: __dirname
          }
        ]
    }
};
