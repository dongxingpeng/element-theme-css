const HtmlWebpackPlugin = require("html-webpack-plugin");
const ElementCssReplaced = require("../index");
module.exports = {
  context:__dirname,
  mode: "production",
  entry: "./main",
  output: {
    filename: "app.js",
    path: __dirname + '/dist',
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
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
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
      title: "Example",
      filename: "index.html",
    }),
    new ElementCssReplaced(),
  ],
};
