import { join, resolve } from 'path'
import webpack from 'webpack'
import pkg from './package.json'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.HKP_SERVER = process.env.HKP_SERVER || 'https://pgp.mit.edu'

const config = {
  entry: {
    client: [
      './client/index.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ],
    vendor: Object.keys(pkg.dependencies).filter(p => !p.match(/^ipfs|babel.+|express.*/))
  },
  output: {
    path: resolve(__dirname, './pub/build/'),
    publicPath: '/build/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HKP_SERVER: JSON.stringify(process.env.HKP_SERVER)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    root: [ join(__dirname, 'client') ],
    extensions: ['', '.js']
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: {
      colors: true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    quiet: true,
    publicPath: '/build' // only trigger webpack-dev on stuff in /build
  },
  stats: {
    colors: true
  },
  devtool: 'cheap-module-eval-source-map',
  noInfo: true,
  quiet: false,
  cache: true
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.DedupePlugin())
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ output: {comments: false} }))
  config.devtool = false
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

export default config
