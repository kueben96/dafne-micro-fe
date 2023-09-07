const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const prodConfig = {
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/theme/latest/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'theme',
            filename: 'remoteEntry.js',
            exposes: {
                './theme': './src/shared-theme',
                './palette': './src/shared-palette',
            },
            shared: packageJson.dependencies,
        })
    ]
}


module.exports = merge(commonConfig, prodConfig);