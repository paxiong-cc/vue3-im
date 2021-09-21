// vue.config.js
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const environment = process.env.NODE_ENV
const webpack = require('webpack')

module.exports = {
  // 处理打包后路径问题
  publicPath: './',

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    config.plugin('html').tap(args => {
      args[0].title = '编辑海报'
      args[0].desc = '一键生成海报'
      return args
    })
  },

  configureWebpack: config => {
    config.plugins.push(
      // 忽略包中哪个模块加载
      // eslint-disable-next-line no-undef
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    )

    // 打包分析
    if (environment === 'development') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        })
      )
    }

    // 将300k以上的包单独打包
    config.optimization.splitChunks = {
      maxInitialRequests: Infinity,
      minSize: 300 * 1024,
      chunks: 'all',
      cacheGroups: {
        antVendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name.
            // node_modules/packageName/sub/path
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },

  productionSourceMap: false
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/base.scss'),
        path.resolve(__dirname, './src/styles/layout.scss')
      ]
    })
}
