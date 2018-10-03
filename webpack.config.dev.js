const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin({ filename: 'dev/style/[name].css', allChunks: true });
const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  output: {
    filename: 'dev/js/[name].js',
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: extractLESS.extract([{
        loader: 'css-loader',
        options: { sourceMap: true, url: false },
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: { sourceMap: true },
      }
      ]),
    }, {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          sourceMap: 'inline',
          presets: ['babel-preset-env'],
          plugins: ['transform-object-rest-spread'],
        },
      }],
    }
    // Loaders for other file types can go here
    ],
  },
  plugins: [
    extractLESS,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  ],
  mode: 'development',
});

module.exports = config;
