var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: Object.assign(
    utils.cssLoaders({
      sourceMap: isProduction
        ? config.production.productionSourceMap
        : config.local.cssSourceMap,
      extract: isProduction
    }),
    {
      ts: {
        loader: 'ts-loader'
      }
    }
  ),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
