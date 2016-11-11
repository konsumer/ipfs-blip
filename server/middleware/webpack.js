/**
 * use webpack-[dev/hot]-middleware in development, build once in production
 */

import webpack from 'webpack'
import webpackConfig from '../../webpack.config.babel'

export const compiler = webpack(webpackConfig)
export let webpackDev = (req, res, next) => next()
export let webpackHot = (req, res, next) => next()

if (process.env.NODE_ENV === 'production') {
  console.log('webpack pre-building.')
  compiler.run(function (err, stats) {
    if (err) throw err
    console.log('webpack pre-built.')
  })
} else {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  webpackDev = webpackDevMiddleware(compiler, webpackConfig.devServer)
  webpackHot = webpackHotMiddleware(compiler)
  console.log('webpack hot-reloading dev-server enabled.')
}
