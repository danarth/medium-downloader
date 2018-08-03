const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    background: './src/background.js',
    contentScript: './src/contentScript.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /static\/.*\.css$/,
      exclude: '/node_modules/',
      use: 'raw-loader'
    }
    ]
  },
  resolve: {
    modules: ['./src', './node_modules', './static']
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'icons'
      }
    ]),
    new GenerateJsonPlugin(
      'manifest.json',
      require('./manifest.json'),
      null,
      2
    ),
    new webpack.DefinePlugin({
      EXTENSION_ID: JSON.stringify('flibbbgmdnoonjoagdkhdmihijfcollk')
    })
  ]
}
