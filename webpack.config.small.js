var webpack = require('webpack');

module.exports = {
  output: {
    path: './dist/',
    publicPath: '/assets/',
    filename: '[name].js',
    library: 'Elem',
    libraryTarget: 'umd'
  },
  entry: {
    'elem.prod': ['./small-lib/main.js']
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: []
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
      '__DEVTOOLS__': process.env.NODE_ENV === 'production' ? false : true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
};
