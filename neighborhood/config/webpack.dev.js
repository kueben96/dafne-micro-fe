const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        uniqueName: 'neighborhood',
        publicPath: 'http://localhost:8087/'
    },
    watchOptions: {
        poll: 1000,
    },
    entry: './src/index.js',
    devServer: {
        port: 8087,
        host: "0.0.0.0",
        historyApiFallback: {
            index: '/index.html'
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'neighborhood',
            filename: 'remoteEntry.js',
            exposes: {
                './NeighborhoodApp': './src/bootstrap'
            },
            remotes: {
                theme: 'theme@http://localhost:8085/remoteEntry.js',
            },
            // shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig);