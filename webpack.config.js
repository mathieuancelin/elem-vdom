var webpack = require('webpack');

var entries = {
  'elem': ['./src/main.js']
};

var devOnlyPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
    '__DEVTOOLS__': process.env.NODE_ENV === 'production' ? false : true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
} else if (process.env.NODE_ENV === 'dev') {
  entries.sink = ['./examples/sink/main.js'];
  plugins = devOnlyPlugins.concat(plugins);
}

module.exports = {
  output: {
    path: './dist/',
    publicPath: '/assets/',
    filename: '[name].js',
    library: 'Elem',
    libraryTarget: 'umd'
  },
  entry: entries,
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        /* IMPORTANT : jsxPragma=Elem.jsx */
        loader: 'babel-loader?stage=0&optional=runtime&jsxPragma=Elem.jsx'
      }
    ]
  },
  plugins: plugins
};
