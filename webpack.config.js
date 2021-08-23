const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ElementCssReplaced = require("./index");
const resolve = (url) => path.resolve(__dirname, url);
module.exports = {
  context: __dirname,
  entry: "./main",
  output: {
    filename: "app.js",
    path: resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:'index.html',
    }),
    new ElementCssReplaced(),
  ],
  devServer: {
    port: "8089",
  },
};
