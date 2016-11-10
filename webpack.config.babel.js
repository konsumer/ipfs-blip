import { DefinePlugin, NoErrorsPlugin, optimize } from 'webpack'
import { resolve } from 'path'
const { DedupePlugin, UglifyJsPlugin, OccurrenceOrderPlugin } = optimize
import ExtractTextPlugin from 'extract-text-webpack-plugin'

process.env.IPFS_HOST = process.env.IPFS_HOST || 'localhost'
process.env.IPFS_PORT = process.env.IPFS_PORT || 4001

const exposed = [
  'NODE_ENV',
  'IPFS_HOST',
  'IPFS_PORT'
]
const exposedEnvironment = {}
exposed.forEach(i => { exposedEnvironment[i] = JSON.stringify(process.env[i]) })

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      './src/index.js',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: resolve(__dirname, './webroot/build'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/i, exclude: /(node_modules)/, loader: 'babel' },
      { test: /\.json$/i, loaders: ['json'] },
      { test: /\.css$/i, loader: ExtractTextPlugin.extract(['css']) },
      { test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'sass']) }
    ]
  },
  plugins: [
    new DedupePlugin(),
    new OccurrenceOrderPlugin(),
    new DefinePlugin({
      'process.env': exposedEnvironment
    }),
    new ExtractTextPlugin('style.css'),
    new NoErrorsPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: {
      colors: true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    quiet: true,
    hot: true,
    publicPath: '/build' // only trigger webpack-dev on stuff in /build
  },
  stats: {
    colors: true
  },
  noInfo: true,
  quiet: false,
  cache: true
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin({sourceMap: false, output: {comments: false}}))
}

export default config
