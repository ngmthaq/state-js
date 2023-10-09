const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: "raw-loader",
      },
    ],
  },
  output: {
    filename: "state-js.min.js",
    path: path.resolve(__dirname, "build"),
  },
};
