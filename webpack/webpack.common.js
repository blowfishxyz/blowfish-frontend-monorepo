const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    background: path.join(srcDir, "background.ts"),
    "pages/scan-result": path.join(srcDir, "pages", "scan-result.tsx"),
    "content-scripts/inject-scripts": path.join(
      srcDir,
      "content-scripts",
      "inject-scripts.ts"
    ),
    "content-scripts/window-messages": path.join(
      srcDir,
      "content-scripts",
      "window-messages.ts"
    ),
    "injected/proxy-window-evm": path.join(
      srcDir,
      "injected",
      "proxy-window-evm.ts"
    ),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
