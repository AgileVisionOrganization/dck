/* global __dirname, require, module*/
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2

let libraryName = "dck-lambda-utils";

let plugins = [],
  outputFile;

if (env === "build") {
  plugins.push(new DtsBundlePlugin());
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
        test: /(\.ts)$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js", ".ts"]
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
      main: "./lib/src/index.d.ts",
      out: "../index.d.ts",
      removeSource: true,
      outputAsModuleFolder: true
    });
  });
};
