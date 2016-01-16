const { resolve } = require('path')
const webpack = require('webpack')
const src = resolve(__dirname, 'src')
const pub = resolve(__dirname, 'public')
const isProd = process.env.NODE_ENV === 'production'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-eval-source-map'
, context: resolve(__dirname)
, entry: isProd ? './src/index.js' : [
    'webpack-dev-server/client?http://127.0.0.1:8080'
  , 'webpack/hot/only-dev-server'
  , './src/index.js'
  ]
, output: isProd ? {
    filename: 'bundle.js'
  , path: pub
  } : {
    filename: 'bundle.js'
  , path: pub
  , publicPath: 'http://127.0.0.1:8080/'
  }
, module: {
    rules: [
    {
      test: /\.js$/
    , include: src
    , use: 'babel-loader'
    }
  , {
      test: /\.css$/
    , include: src
    , use: [
        'style-loader'
      , {
          loader: 'css-loader'
        , options: {
            modules: true
          , importLoaders: 1
          , localIdentName: '[local]__[hash:base64:9]'
          }
        }
        , 'postcss-loader'
      ]
    }
  ]}
, devServer: {
    contentBase: './public'
  , historyApiFallback: true
  , hot: true
  , stats: { colors: true }
  , overlay: false
  }
, plugins: isProd ? [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  , new UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ] : [
    new webpack.HotModuleReplacementPlugin()
  , new webpack.LoaderOptionsPlugin({ debug: true })
  ]
, resolve: {
    extensions : ['.js', '.css']
  }
, node: {
    fs: 'empty'
  , net: 'empty'
  , tls: 'empty'
  , readline: 'empty'
  , child_process: 'empty'
  }
}
