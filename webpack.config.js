const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3005;

module.exports = {
  // Webpack configuration goes here
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path : __dirname+'/output/dist',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       },
  //       vendor: {
  //         chunks: 'initial',
  //         test: 'vendor',
  //         name: 'vendor',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/blog-icon.png'
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};