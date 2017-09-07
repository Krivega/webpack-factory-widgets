const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const config = require('./config');
const environment = require('./environment');

const root = path.resolve(__dirname, '../');
const isProd = environment !== 'dev';
const ignoredRegex = /(node_modules)/;

const vendorPatchs = ['node_modules'];

function isVendor({ resource }) {
  return resource && vendorPatchs.some((pathVendor) => resource.indexOf(pathVendor) !== -1);
}

const configWebpack = {
  context: path.resolve(root, config.src.path),
  entry: {
    entry: './js/entry.js'
  },
  output: {
    path: path.resolve(root, config.dest.js),
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[chunkhash].js',
    publicPath: '/js/'
  },
  module: {
    rules: [{
      test: /\.js$/,
        exclude: ignoredRegex,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                targets: {
                  browsers: ['last 2 versions']
                }
              }]
            ],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: isVendor,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new AssetsPlugin({
      prettyPrint: true,
      filename: `${config.dest.js}/assets.json`
    })
  ],
  watchOptions: {
    ignored: ignoredRegex
  }
};

if (isProd) {
  configWebpack.devtool = 'source-map';
  configWebpack.plugins = configWebpack.plugins.concat(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      extractComments: true,
      comments: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );

}

module.exports = configWebpack;
