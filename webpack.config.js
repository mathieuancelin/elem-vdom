var webpack = require('webpack');

module.exports = {
  output: {
    path: './dist/',
    publicPath: '/assets/',
    filename: 'elem.js',
    library: 'Elem',
    libraryTarget: 'umd'
  },
  entry: {
    'Elem': ['./src/main.js']
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    nopreLoaders: [
      {
        // "extends": "eslint-config-airbnb",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0&optional=runtime'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
