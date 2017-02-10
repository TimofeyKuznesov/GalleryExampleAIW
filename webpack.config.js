const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  entry: [
    path.join(__dirname, './index.web.js')
  ],
  module: {
    loaders: [
      {
        test: /\.(web\.js|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },

    ]
  },
  output: {
    filename: 'src/bundle.js'
  },
//	devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
//      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
//new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.NormalModuleReplacementPlugin(
  /react-native\/Libraries\/Renderer\/src\/renderers\/native\/ReactNativePropRegistry/,
  require.resolve('react-native-web/dist/modules/ReactNativePropRegistry')),
  ],
  resolve: {
    alias: {
              'react-native': 'react-native-web'
    },
    extensions: ['','.web.js','.js', '.jsx','css'],
  }
};
