var path = require('path');
var name = 'simple-styleguide';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: name + '.js',
    library: name,
    libraryTarget: "commonjs-module"
  },
  externals: {
    'react': 'commonjs react'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
