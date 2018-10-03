const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


function generateEntry() {
  // 同步遍历一级目录下的所有js文件
  const dir = './public/js';
  const dirList = fs.readdirSync(dir);
  const entry = {};
  dirList.forEach(function(item) {
    const path = dir + '/' + item;
    if (fs.statSync(path).isFile()) {
      if (/\.js$/.test(item)) {
        const name = item.replace(/\.js$/, '');
        entry[name] = path;
      }
    }
  });
  return entry;
}

function generateHtmlWebpackPluginConfig(entry) {
  const configs = [];
  _.forEach(entry, (path, name) => {
    configs.push(new HtmlWebpackPlugin({
      inject: false,
      template: 'templates/views/partials_source/scripts.hbs',
      filename: `../templates/views/partials/js/${name}.hbs`,
      chunks: ['vendor', name],
    }));
    configs.push(new HtmlWebpackPlugin({
      inject: false,
      template: 'templates/views/partials_source/styles.hbs',
      filename: `../templates/views/partials/style/${name}.hbs`,
      chunks: [name],
    }));
  });
  return configs;
}

const entry = generateEntry();

const config = {
  context: __dirname,
  entry,
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'dist/js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: './dist/fonts',
        },
      }],
    }
    // Loaders for other file types can go here
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    ...generateHtmlWebpackPluginConfig(entry)
  ],
  mode: 'development',
};

module.exports = config;
