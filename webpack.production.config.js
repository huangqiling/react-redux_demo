const webpack = require("webpack");
const path = require("path");
const postcssSCSS = require("postcss-scss");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  devtool: "cheap-source-map",
  entry: [path.resolve(__dirname, "src/index.js")],
  output: {
    path: path.join(__dirname, "dist-[hash]"),
    publicPath: `./`,
    filename: "[name]-[hash].js"
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
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                sytax: postcssSCSS,
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: path.resolve(__dirname, "src")
              }
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  resolve: {
    extensions: [".", ".js", ".jsx"]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
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
    new uglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, "src/public"),
    //     to: "./public",
    //     toType: "dir"
    //   }
    // ])
  ]
};
