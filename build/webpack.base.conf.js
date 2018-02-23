var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
//针对编译文件速度的优化，启用node的多线程
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // 采用多进程，进程数由CPU核数决定
console.log('当前系统cpu核数:', os.cpus().length)

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  cache: true, //开启webpack的cache
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.production.assetsRoot,
    filename: '[name].js',
    publicPath: config[process.env.NODE_ENV].assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'), // 主目录
      store: '@/vuex', // vuex组件数据共享
      router: '@/router', // 路由
      views: '@/views', // 页面库
      static: resolve('static') // 静态资源
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'happypack/loader?id=tslint',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        include: [resolve('src/components'), resolve('src/views')],
        exclude: /node_modules\/vendor\.dll\.js/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true //取消ts类型检查，由fork-ts-checker-webpack-plugin负责
        },
        include: [resolve('src')],
        exclude: [/node_modules/, resolve('static')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('imgs/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    createHappyPlugin('tslint', ['tslint-loader']),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true,
      watch: ['./src'],
      memoryLimit: 4096
    }),
    /**
     * dllPlugin预编译与引用
     * Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，因此线上的dll代码不需要随着版本发布频繁更新
     */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/common-manifest.json')
    }),
    // 复制公共dll.js，并插入html
    assetHtml()
  ]
}

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: true
  })
}

function assetHtml() {
  const filesName = ['common.dll.js']
  return new AddAssetHtmlPlugin(
    filesName.map(name => {
      return Object.assign(
        {
          outputPath: utils.assetsPath('js'),
          publicPath:
            config[process.env.NODE_ENV].assetsPublicPath + 'static/js',
          includeSourcemap: false,
          hash: true
        },
        {
          filepath: path.resolve(__dirname, '../static/js/' + name)
        }
      )
    })
  )
}
