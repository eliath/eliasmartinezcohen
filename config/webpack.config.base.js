module.exports = {
  entry: "",
  output: { path: __dirname + "/dist", filename: "bundle.js"  },

  // using webpack loader
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", // or just "babel"
        query: {
          presets: ['es2015']

        }

      }

    ]

  }

};
