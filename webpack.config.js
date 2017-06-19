const webpack = require("webpack");
const path = require("path");
const postcssSCSS = require("postcss-scss");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: "./src/public",
    port: 3000
  },
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: `/`,
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "./asset/img/[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(scss|css)/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              sytax: postcssSCSS,
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: path.resolve(__dirname, "src")
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, "src/public/favicon.ico"),
      filename: "index.html",
      inject: "body",
      template: path.join(__dirname, "src/public/index.html"),
      minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: "http://localhost:3000" })
  ]
};
