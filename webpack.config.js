//direct the files
const path = require('path');
// plugin automatically add css, js ,... assets from your entry point to your html output. 
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: process.env.NODE_ENV,
  // set the entry and output points for the webpack to initiate compiling
  entry: {
    src: './client/main.js'
  },
  output: {
    // in production, the bundle will live on file System
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  // set rules for the webpack to transpile modules
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.s?css/,
        exclude: /node_module/,
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ]
      }
    ]
  },
  // configure any plugins for development mode
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/index.html' //might need resolve(__dirname, client/)
    }),
  ],
  devServer: {
    // its where the bundle.js will live on RAM during development?
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build')
    }, 
    // set up the proxy such that you can call API requests from hot-reload webpack server to the express back-end server
    // aka fetch req. from localhoast:8080/api/* redirect to localhost:3000/api/*
    proxy: {
      '/convert/**': 'http://localhost:3000',
      secure: false,
    } 
  }

}