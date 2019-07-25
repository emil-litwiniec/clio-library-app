
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = env => {

  const isProduction = env === 'production';
  

  let envvar;
  if(!isProduction) {
    envvar = Object.keys(dotenv.config().parsed).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  } else {
    envvar = dotenv.config().parsed;
  }
  
  return {
		mode: isProduction ? 'production' : 'development',
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },

    plugins: isProduction ? [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|css|html|svg/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
      // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      // new BundleAnalyzerPlugin()
    ] : [
      // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      new webpack.DefinePlugin(envvar)
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
              }
            }
          ]
        }
      ]
    },
    devtool: isProduction ? '' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
		},
		optimization: {
      concatenateModules: isProduction ? true : false,
      // splitChunks: {
      //   chunks: 'all',
      //   minChunks: 2
      // },
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        }
      }
		},
  }
}
