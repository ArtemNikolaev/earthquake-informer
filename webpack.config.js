const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Earthquake Informer',
      template: './src/static/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/static/logo.png',
      inject: true,
    }),
  ],
};
