const {GenerateSW} = require('workbox-webpack-plugin')

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
    new GenerateSW({
      navigateFallback: '/',
      globDirectory: './public',
      globPatterns: ['*/*.{js,css,html,ico,jpeg,svg}', '*.{js,css,json}'],
      globIgnores: ['*precache*', '*service-worker*']
    })
  ]
}
