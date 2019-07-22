// entry -> output
const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = env => {
  const isProduction = env === 'production';
  return {
		mode: isProduction ? 'production' : '',
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },

    plugins: [
      // new MiniCssExtractPlugin({
      //     filename: !isProduction
      //         ? "[name].css"
      //         : "[name].[hash].css",
      //     chunkFilename: !isProduction
      //         ? "[id].css"
      //         : "[id].[hash].css"
      // }),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new BundleAnalyzerPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
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
        // {
        //     test: /\.s?css$/,
        //     use: [
        //         { loader: MiniCssExtractPlugin.loader },
        //         {
        //             loader: "css-loader",
        //             options: {
        //                 sourceMap: true
        //             }
        //         },
        //         {
        //             loader: "sass-loader",
        //             options: {
        //                 sourceMap: true
        //             }
        //         }
        //     ]
        //     // use: CSSExtract.extract({
        //     //     use: [
        //     //         {
        //     //             loader: "css-loader",
        //     //             options: {
        //     //                 sourceMap: true
        //     //             }
        //     //         },
        //     //         {
        //     //             loader: "sass-loader",
        //     //             options: {
        //     //                 sourceMap: true
        //     //             }
        //     //         }
        //     //     ]
        //     // })
        // }
      ]
    },
    devtool: isProduction ? '' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
		},
		optimization: {
			concatenateModules: true,
		},
	
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all'
    //       }
    //     }
    //   }
    // }
  }
}
