const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const path = require('path')

const PUBLIC_PATH = isDev
  ? 'http://localhost:8080/'
  : 'https://nicebreakers.herokuapp.com/'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    publicPath: PUBLIC_PATH
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'assets-manifest.json',
      seed: {
        'materialize.min.css': PUBLIC_PATH + 'materialize.min.css',
        'materialize.min.js': PUBLIC_PATH + 'materialize.min.js',
        'jquery-3.3.1.slim.min.js': PUBLIC_PATH + 'jquery-3.3.1.slim.min.js'
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'nicebreakers',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return
        }
        console.log(message)
      },
      navigateFallback: PUBLIC_PATH + 'index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ]
}
