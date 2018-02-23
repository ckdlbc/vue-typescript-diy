const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css
const os = require('os')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
  entry: {
    common: [
      'vue', //258kb
      'vue-router', //25kb
      'vuex', //11kb
      'babel-polyfill' //85kb
    ]
    // 此处可添加多个包
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_[chunkhash]_library' // vendor.dll.js中暴露出的全局变量名
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll', '[name]-manifest.json'),
      name: '[name]_[chunkhash]_library',
      context: __dirname
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      workerCount: os.cpus().length,
      uglifyJS: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      }
    })
  ]
}
