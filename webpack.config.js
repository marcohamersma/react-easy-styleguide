var path = require('path')
var name = 'react-easy-styleguide'
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: name,
    libraryTarget: 'umd',
  },
  externals: {
    react: 'commonjs react',
    'react-router': 'commonjs react-router',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/unicode\/category\/So/),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8889,
    // }),
  ],
}
