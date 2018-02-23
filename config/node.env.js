var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
//此处是个坑，如果要在webpack.DefinePlugin引入process.env.NODE_ENV请先转换成string，否则打包后会误认为是对象
module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV) || '"local"'
})
