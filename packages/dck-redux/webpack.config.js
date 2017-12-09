/* global __dirname, require, module*/

const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2

let libraryName = "dck-redux";

let plugins = [],
  outputFile;

if (env === "build") {
  plugins.push(new DtsBundlePlugin());
  /*plugins.push(new UglifyJsPlugin({ minimize: false }));
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  );*/
  outputFile = libraryName + ".js";
} else {
  outputFile = libraryName + ".js";
}

const config = {
  entry: __dirname + "/src/index.ts",
  devtool: "source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js", ".jsx", ".ts", ".tsx"]
  },
  externals: [nodeExternals()],
  plugins: plugins
};

module.exports = config;
function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin("done", function() {
    var dts = require("dts-bundle");
    dts.bundle({
      name: libraryName,
      main: "./lib/dist/index.d.ts",
      out: "../index.d.ts",
      removeSource: true,
      outputAsModuleFolder: true
    });
  });
};
