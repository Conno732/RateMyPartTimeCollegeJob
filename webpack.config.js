const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  plugins: [],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: false,
  },
};
