const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        port: 8083,
        historyApiFallback: {
            historyApiFallback: true,
        }
    },
    output: {
        publicPath: '/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dafne',
            filename: 'remoteEntry.js',
            exposes: {
                './DafneApp': './src/bootstrap'
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);