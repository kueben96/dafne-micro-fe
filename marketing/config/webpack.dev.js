const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 8081,
        historyApiFallback: {
            historyApiFallback: true,
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);