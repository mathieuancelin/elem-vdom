var webpack = require('webpack');

var preLoaders = [];

if (process.env.NODE_ENV === 'lint') {
  preLoaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  });
}

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
    preLoaders: preLoaders,
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
