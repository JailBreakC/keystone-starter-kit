const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin({ filename: 'dist/style/[name].[chunkhash:8].css', allChunks: true });
const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  output: {
    filename: 'dist/js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: extractLESS.extract([{
        loader: 'css-loader',
        options: { sourceMap: false, url: false },
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: { sourceMap: false },
      }
      ]),
    }, {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          sourceMap: false,
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
    new UglifyJSPlugin({
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ],
  mode: 'production',
});

module.exports = config;
