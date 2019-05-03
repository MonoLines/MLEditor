const {resolve} = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, {
  mode
}) => ({
  entry: resolve(__dirname, 'src', 'index.ts'),
  target: 'web',
  devtool: 'none',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: [resolve(__dirname, 'src')],
      loader: 'ts-loader'
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
