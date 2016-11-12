const path = require('path')

module.exports = {
  context: path.resolve(__dirname)
, entry: './src/index.js'
, output: {
    filename: 'bundle.js'
  , path: './public'
  }
, module: {
    loaders: [{
      test: /\.js$/
    , include: path.resolve(__dirname, 'src')
    , loaders: ['babel']
    }
  , {
      test: /\.css/
    , include: path.resolve(__dirname, 'src')
    , loader: 'style!css'
    }
  ]}
, resolve: {
    extensions: ['', '.js', '.css']
  }
}
