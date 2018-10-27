import { resolve } from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

function webpackConfig(entry) {
  let webpackConfig = {
    mode: process.env.NODE_ENV || 'development',

    entry: './src/TruncateJS.js',

    output: {
      path: resolve(__dirname, 'dist'),
      filename: entry.filename,
      library: 'TruncateJS',
      libraryTarget: 'umd',
    },

    optimization: {
      minimize: entry.minify || false,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
        }),
      ],
    },

    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };

  if (entry.analyze && process.argv.includes('--analyze')) {
    webpackConfig.plugins.push([
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
      }),
    ]);
  }

  return webpackConfig;
}

export default webpackConfig;
