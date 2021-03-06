var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: ['./fe/application.jsx']
  },
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  },
  stats: {
    colors: true,
    reasons: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  devtool: "#cheap-module-eval-source-map"
};
