const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        uniqueName: 'dafne',
        publicPath: "http://localhost:8083/",
    },
    devServer: {
        port: 8083,
        historyApiFallback: {
            historyApiFallback: true,
        },

    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dafne',
            filename: 'remoteEntry.js',
            exposes: {
                './DafneApp': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);