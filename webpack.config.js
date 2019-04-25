const {
  resolve
} = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, {
  mode
}) => ({
  entry: resolve(__dirname, 'src', 'index.js'),
  target: 'web',
  devtool: 'none',
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },  {
      test: /\.js$/,
      include: [resolve(__dirname, 'src')],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    }]
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: mode === 'production' ? 'monolines-editor.min.js' : 'monolines-editor.js',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: true,
    })],
  }
});
