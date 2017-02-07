var path = require('path');
var name = 'simple-styleguide';
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: name + '.js',
    library: name,
    libraryTarget: "umd"
  },
  externals: {
    'react': 'commonjs react',
    'react-router': 'commonjs react-router'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/unicode\/category\/So/)
  ]
};
