/* global __dirname, require, module*/

const nodeExternals = require("webpack-node-externals");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const DtsBundleWebpack = require('dts-bundle-webpack');
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2

const buildConfig = (libraryName, directory) => {
    let plugins = [],
    outputFile;
    if (env === "build") {
        plugins.push(new DtsBundleWebpack({
            name: libraryName,
            main: "./dist/index.d.ts",
            out: "../lib/index.d.ts",
            removeSource: true,
            outputAsModuleFolder: true
        }));
        outputFile = libraryName + ".js";
    } else {
        outputFile = libraryName + ".js";
    }

    return {
        entry: directory + "/src/index.ts",
        devtool: "source-map",
        output: {
            path: directory + "/lib",
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
        optimization: {
            minimizer: [new UglifyJsPlugin()],
        },
        externals: [nodeExternals()],
        plugins: plugins
    };
}

module.exports = buildConfig;